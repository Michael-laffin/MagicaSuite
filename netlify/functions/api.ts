import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';
import { z } from 'zod';
import { createNodeMiddleware } from '@sentry/netlify';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// Initialize Firestore
const db = admin.firestore();

// Validation schemas
const userSchema = z.object({
  userId: z.string(),
  userData: z.object({
    email: z.string().email(),
    name: z.string(),
    // Add other user fields as needed
  }),
});

// Helper function to verify Firebase token
async function verifyFirebaseToken(authHeader: string | undefined) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.split('Bearer ')[1];
  return admin.auth().verifyIdToken(token);
}

// Helper function to verify API key
function verifyApiKey(apiKey: string | undefined) {
  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new Error('Invalid API key');
  }
}

// Error response helper
function errorResponse(statusCode: number, message: string) {
  return {
    statusCode,
    body: JSON.stringify({ error: message }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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

  try {
    // Verify API key for all requests
    verifyApiKey(event.headers['x-api-key']);

    const path = event.path.replace('/.netlify/functions/api/', '');
    const userId = event.queryStringParameters?.userId;

    switch (true) {
      // Get user
      case event.httpMethod === 'GET' && path === 'users' && userId:
        try {
          await verifyFirebaseToken(event.headers.authorization);
          const userDoc = await db.collection('users').doc(userId).get();

          if (!userDoc.exists) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'User not found' }),
            };
          }

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(userDoc.data()),
          };
        } catch (error) {
          return errorResponse(401, 'Unauthorized');
        }

      // Create user
      case event.httpMethod === 'POST' && path === 'users':
        try {
          await verifyFirebaseToken(event.headers.authorization);
          const body = JSON.parse(event.body || '{}');
          const validatedData = userSchema.parse(body);

          await db.collection('users').doc(validatedData.userId).set({
            ...validatedData.userData,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true }),
          };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return errorResponse(400, 'Invalid user data');
          }
          return errorResponse(401, 'Unauthorized');
        }

      // Update user
      case event.httpMethod === 'PUT' && path === 'users' && userId:
        try {
          await verifyFirebaseToken(event.headers.authorization);
          const body = JSON.parse(event.body || '{}');
          const validatedData = userSchema.shape.userData.parse(body);

          await db.collection('users').doc(userId).update({
            ...validatedData,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true }),
          };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return errorResponse(400, 'Invalid user data');
          }
          return errorResponse(401, 'Unauthorized');
        }

      default:
        return errorResponse(404, 'Not Found');
    }
  } catch (error) {
    console.error('API Error:', error);
    return errorResponse(500, 'Internal Server Error');
  }
};

// Wrap handler with Sentry
export const handler = process.env.SENTRY_DSN
  ? createNodeMiddleware(handler)
  : handler;
