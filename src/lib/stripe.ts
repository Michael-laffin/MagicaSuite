import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the publishable key
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// API endpoint for creating a subscription
const API_URL = 'http://localhost:3001';

export const createSubscription = async () => {
  try {
    const response = await fetch(`${API_URL}/api/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    const data = await response.json();
    return { clientSecret: data.clientSecret };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};
