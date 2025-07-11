import { createApiClient } from './client';
import { useAuth } from '@hooks/useAuth';

// Types
interface SubscriptionStatus {
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'canceling' | 'none';
  currentPeriodEnd?: string;
  priceId?: string;
}

interface CheckoutSession {
  sessionId: string;
}

interface PortalSession {
  url: string;
}

// API endpoints
export const endpoints = {
  subscription: {
    status: '/.netlify/functions/get-subscription-status',
    manage: '/.netlify/functions/manage-subscription',
    checkout: '/.netlify/functions/create-checkout',
  },
  user: {
    profile: '/.netlify/functions/get-user-profile',
    update: '/.netlify/functions/update-user-profile',
  },
} as const;

// API hooks
export const useApi = () => {
  const { getIdToken, user } = useAuth();

  // Create API client with the getIdToken function
  // This ensures proper Bearer token format: "Bearer <token>"
  const apiClient = createApiClient(getIdToken);

  // Helper function to ensure user is authenticated
  const ensureAuthenticated = () => {
    if (!user) {
      throw new Error('User must be authenticated to perform this action');
    }
  };

  return {
    subscription: {
      getStatus: async () => {
        ensureAuthenticated();
        return apiClient.get<SubscriptionStatus>(endpoints.subscription.status);
      },

      createCheckout: async () => {
        ensureAuthenticated();
        return apiClient.post<CheckoutSession>(endpoints.subscription.checkout);
      },

      manage: async (action: 'cancel' | 'reactivate' | 'portal') => {
        ensureAuthenticated();
        return apiClient.post<PortalSession>(endpoints.subscription.manage, { action });
      },
    },

    user: {
      getProfile: async () => {
        ensureAuthenticated();
        return apiClient.get(endpoints.user.profile);
      },

      updateProfile: async (data: unknown) => {
        ensureAuthenticated();
        return apiClient.put(endpoints.user.update, data);
      },
    },
  };
};

// Export types
export type { SubscriptionStatus, CheckoutSession, PortalSession };
