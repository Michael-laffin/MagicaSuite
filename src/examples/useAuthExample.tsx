import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Example component demonstrating how to use the getIdToken method
 * from the useAuth hook for making authenticated API calls.
 */
export const AuthTokenExample: React.FC = () => {
  const { user, getIdToken } = useAuth();

  const handleApiCall = async () => {
    try {
      // Get the current user's ID token with auto-refresh
      const token = await getIdToken();
      
      if (!token) {
        console.log('No authentication token available');
        return;
      }

      // Use the token for API calls
      const response = await fetch('/api/protected-endpoint', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();
      console.log('API response:', data);
    } catch (error) {
      console.error('Error making authenticated API call:', error);
    }
  };

  const handlePostData = async () => {
    try {
      const token = await getIdToken();
      
      if (!token) {
        console.log('User not authenticated');
        return;
      }

      const response = await fetch('/api/user-data', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello from authenticated user!',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      console.log('Data posted successfully');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  if (!user) {
    return <div>Please sign in to use authenticated features.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Authentication Token Example</h2>
      <p className="mb-4">Signed in as: {user.email}</p>
      
      <div className="space-y-2">
        <button
          onClick={handleApiCall}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Make Authenticated GET Request
        </button>
        
        <button
          onClick={handlePostData}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Make Authenticated POST Request
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>The <code>getIdToken()</code> method automatically refreshes the token if needed</li>
          <li>It returns <code>null</code> if the user is not authenticated</li>
          <li>The token is passed in the Authorization header as a Bearer token</li>
          <li>Server-side middleware can verify this token using Firebase Admin SDK</li>
        </ul>
      </div>
    </div>
  );
};

export default AuthTokenExample;
