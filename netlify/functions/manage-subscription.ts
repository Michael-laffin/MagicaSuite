import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// Helper function to verify Firebase token
async function verifyFirebaseToken(authHeader: string | undefined) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.split('Bearer ')[1];
  return admin.auth().verifyIdToken(token);
}

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(event.headers.authorization);
    const userId = decodedToken.uid;

    // Parse request body
    const { action } = JSON.parse(event.body || '{}');

    // Get user data
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    const userData = userDoc.data();
    const customerId = userData?.stripeCustomerId;

    if (!customerId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No Stripe customer found' }),
      };
    }

    switch (action) {
      case 'cancel': {
        // Get current subscription
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: 'active',
          limit: 1,
        });

        if (subscriptions.data.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'No active subscription found' }),
          };
        }

        // Cancel subscription at period end
        const subscription = await stripe.subscriptions.update(
          subscriptions.data[0].id,
          { cancel_at_period_end: true }
        );

        // Update user document
        await db.collection('users').doc(userId).update({
          subscriptionStatus: 'canceling',
          subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ subscription }),
        };
      }

      case 'reactivate': {
        // Get current subscription
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: 'active',
          limit: 1,
        });

        if (subscriptions.data.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'No active subscription found' }),
          };
        }

        // Remove cancellation
        const subscription = await stripe.subscriptions.update(
          subscriptions.data[0].id,
          { cancel_at_period_end: false }
        );

        // Update user document
        await db.collection('users').doc(userId).update({
          subscriptionStatus: 'active',
          subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ subscription }),
        };
      }

      case 'portal': {
        // Create customer portal session
        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: `${process.env.FRONTEND_URL}/dashboard`,
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ url: session.url }),
        };
      }

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action' }),
        };
    }
  } catch (error) {
    console.error('Manage subscription error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
