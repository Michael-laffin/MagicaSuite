import * as Sentry from '@sentry/browser';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const initializeErrorHandling = () => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          tracePropagationTargets: ['localhost', /^https:\/\/.*\.netlify\.app/],
        }),
        new Sentry.Replay(),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(event.reason);
    }
  });

  // Handle uncaught exceptions
  window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(event.error);
    }
  });
};

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    if (error.isOperational) {
      // Handle operational errors (e.g., display to user)
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }

  // For programming or unknown errors
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error);
  } else {
    console.error('An error occurred:', error);
  }

  // Return a generic error message to the user
  return {
    message: 'An unexpected error occurred. Please try again later.',
    statusCode: 500,
  };
};

export const createHttpError = (statusCode: number, message: string) => {
  return new AppError(message, statusCode);
};

// API error handler
export const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'An unexpected error occurred',
    }));

    throw new AppError(
      errorData.message || 'An unexpected error occurred',
      response.status
    );
  }
  return response;
};

// Utility function to safely parse JSON
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback;
  }
};
