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
};

// API hooks
export const useApi = () => {
  const { getIdToken } = useAuth();
  const apiClient = createApiClient(getIdToken);

  return {
    subscription: {
      getStatus: () => 
        apiClient.get<SubscriptionStatus>(endpoints.subscription.status),
      
      createCheckout: () => 
        apiClient.post<CheckoutSession>(endpoints.subscription.checkout),
      
      manage: (action: 'cancel' | 'reactivate' | 'portal') =>
        apiClient.post<PortalSession>(endpoints.subscription.manage, { action }),
    },
    
    user: {
      getProfile: () => 
        apiClient.get(endpoints.user.profile),
      
      updateProfile: (data: unknown) => 
        apiClient.put(endpoints.user.update, data),
    },
  };
};

// Export types
export type { SubscriptionStatus, CheckoutSession, PortalSession };
