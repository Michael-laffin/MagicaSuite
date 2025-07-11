import { renderHook, act } from '@testing-library/react';
import { useAuth, AuthProvider } from '../useAuth';
import { auth } from '../../lib/firebase';
import { User } from 'firebase/auth';

// Mock Firebase auth
jest.mock('../../lib/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  googleProvider: {},
}));

// Mock Firebase auth functions
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  onAuthStateChanged: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  signInWithPopup: jest.fn(),
}));

const mockUser = {
  uid: 'test-uid',
  email: 'test@example.com',
  getIdToken: jest.fn(),
} as unknown as User;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when no user is authenticated', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    const token = await result.current.getIdToken();
    expect(token).toBeNull();
  });

  it('should return ID token when user is authenticated', async () => {
    const mockToken = 'mock-id-token';
    mockUser.getIdToken = jest.fn().mockResolvedValue(mockToken);

    // Mock the auth state change to simulate authenticated user
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // Simulate user being set
    act(() => {
      // This would normally be done by the onAuthStateChanged listener
      (result.current as any).user = mockUser;
    });

    const token = await result.current.getIdToken();
    expect(token).toBe(mockToken);
    expect(mockUser.getIdToken).toHaveBeenCalledWith(true); // forceRefresh = true
  });

  it('should handle token refresh errors gracefully', async () => {
    const mockError = new Error('Token refresh failed');
    mockUser.getIdToken = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // Simulate user being set
    act(() => {
      (result.current as any).user = mockUser;
    });

    const token = await result.current.getIdToken();
    expect(token).toBeNull();
    expect(result.current.error).toBe('Token refresh failed');
  });

  it('should force refresh token on each call', async () => {
    const mockToken = 'fresh-token';
    mockUser.getIdToken = jest.fn().mockResolvedValue(mockToken);

    const { result } = renderHook(() => useAuth(), { wrapper });
    
    act(() => {
      (result.current as any).user = mockUser;
    });

    await result.current.getIdToken();
    await result.current.getIdToken();

    // Should be called twice with forceRefresh = true
    expect(mockUser.getIdToken).toHaveBeenCalledTimes(2);
    expect(mockUser.getIdToken).toHaveBeenNthCalledWith(1, true);
    expect(mockUser.getIdToken).toHaveBeenNthCalledWith(2, true);
  });
});
