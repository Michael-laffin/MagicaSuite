const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');
const { logger } = require('./logger');

// Initialize Sentry
const initSentry = () => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        new ProfilingIntegration(),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      beforeSend(event) {
        // Remove sensitive data
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers['authorization'];
          delete event.request.headers['x-api-key'];
        }
        return event;
      },
    });

    logger.info('Sentry initialized successfully');
  }
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error('Unhandled Error:', err);

  // Capture error in Sentry if in production
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(err);
  }

  // Don't expose error details in production
  const error = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred'
    : err.message;

  res.status(err.status || 500).json({ error });
};

// Performance monitoring middleware
const performanceMonitor = (req, res, next) => {
  const start = Date.now();

  // Once the response is finished, log the performance metrics
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    };

    if (duration > 1000) {
      logger.warn('Slow Request:', log);
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureMessage('Slow Request Detected', {
          level: 'warning',
          extra: log,
        });
      }
    } else {
      logger.info('Request completed:', log);
    }
  });

  next();
};

module.exports = {
  initSentry,
  errorHandler,
  performanceMonitor,
};
