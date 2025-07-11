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

    // Create or retrieve Stripe customer
    let customerId = userData?.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: decodedToken.email,
        metadata: {
          userId: userId,
        },
      });
      customerId = customer.id;
      
      // Update user with Stripe customer ID
      await db.collection('users').doc(userId).update({
        stripeCustomerId: customerId,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      client_reference_id: userId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.VITE_STRIPE_SUCCESS_URL || process.env.FRONTEND_URL + '/dashboard'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.VITE_STRIPE_CANCEL_URL || `${process.env.FRONTEND_URL}/pricing`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Create checkout error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
