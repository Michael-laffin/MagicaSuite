import logger from '../utils/logger.js';

// Response time monitoring
export const responseTime = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const time = diff[0] * 1e3 + diff[1] * 1e-6; // Convert to milliseconds
    
    logger.info({
      message: 'Request completed',
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      responseTime: `${time.toFixed(2)}ms`,
    });

    // Alert on slow responses
    if (time > 1000) { // Alert if response takes more than 1 second
      logger.warn({
        message: 'Slow response detected',
        method: req.method,
        path: req.path,
        responseTime: `${time.toFixed(2)}ms`,
      });
    }
  });

  next();
};

// Memory usage monitoring
export const memoryUsage = (req, res, next) => {
  const used = process.memoryUsage();
  
  const memoryUsage = {
    rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
    external: `${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`,
  };

  // Log memory usage if it exceeds thresholds
  if (used.heapUsed / used.heapTotal > 0.9) { // 90% heap usage
    logger.warn({
      message: 'High memory usage detected',
      ...memoryUsage,
    });
  }

  next();
};

// Error tracking
export const errorTracking = (err, req, res, next) => {
  logger.error({
    message: 'Error occurred',
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  next(err);
};
