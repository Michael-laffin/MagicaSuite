import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorProps {
  title?: string;
  message?: string;
  error?: Error;
  retry?: () => void;
  fullScreen?: boolean;
}

export const Error: React.FC<ErrorProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again later.',
  error,
  retry,
  fullScreen = false,
}) => {
  const navigate = useNavigate();

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
      {error?.message && process.env.NODE_ENV === 'development' && (
        <pre className="mt-2 max-w-lg overflow-x-auto rounded bg-gray-100 p-4 text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-200">
          {error.message}
        </pre>
      )}
      <div className="flex space-x-4">
        {retry && (
          <button
            onClick={retry}
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try Again
          </button>
        )}
        <button
          onClick={() => navigate('/')}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Go Home
        </button>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return content;
};

export const ErrorPage: React.FC<Omit<ErrorProps, 'fullScreen'>> = (props) => (
  <Error {...props} fullScreen />
);

export default Error;
