const NodeCache = require('node-cache');
const { logger } = require('./logger');

// Initialize cache with standard TTL of 10 minutes and check period of 1 minute
const cache = new NodeCache({
  stdTTL: 600,
  checkperiod: 60,
  useClones: false
});

cache.on('expired', (key, value) => {
  logger.debug(`Cache key expired: ${key}`);
});

// Cache middleware
const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
      return next();
    }

    const key = `cache:${req.originalUrl || req.url}`;

    try {
      const cachedResponse = cache.get(key);

      if (cachedResponse) {
        return res.json(cachedResponse);
      }

      // Override res.json to cache the response
      const originalJson = res.json;
      res.json = function(body) {
        cache.set(key, body, duration);
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      logger.error('Cache Middleware Error:', error);
      next();
    }
  };
};

// Cache invalidation
const invalidateCache = async (pattern) => {
  try {
    const keys = cache.keys();
    const matchingKeys = keys.filter(key => key.includes(pattern));
    matchingKeys.forEach(key => cache.del(key));
    logger.info(`Cache invalidated for pattern: ${pattern}`);
  } catch (error) {
    logger.error('Cache Invalidation Error:', error);
  }
};

// Get cache stats
const getCacheStats = () => {
  return {
    keys: cache.keys().length,
    hits: cache.getStats().hits,
    misses: cache.getStats().misses,
    ksize: cache.getStats().ksize,
    vsize: cache.getStats().vsize
  };
};

module.exports = {
  cache,
  cacheMiddleware,
  invalidateCache,
  getCacheStats
};
