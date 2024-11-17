const request = require('supertest');
const { app } = require('../index.js');
const { rateLimit } = require('express-rate-limit');

describe('Security Tests', () => {
  describe('Authentication', () => {
    it('should reject requests without API key', async () => {
      const response = await request(app).get('/api/users/123');
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid API key');
    });

    it('should reject invalid Firebase tokens', async () => {
      const response = await request(app)
        .get('/api/users/123')
        .set('Authorization', 'Bearer invalid-token')
        .set('x-api-key', process.env.API_KEY);
      expect(response.status).toBe(401);
    });
  });

  describe('Rate Limiting', () => {
    it('should limit repeated requests', async () => {
      const requests = Array(101).fill().map(() => 
        request(app)
          .get('/api/users/123')
          .set('x-api-key', process.env.API_KEY)
      );
      
      const responses = await Promise.all(requests);
      const tooManyRequests = responses.filter(r => r.status === 429);
      expect(tooManyRequests.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should reject invalid user data', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('x-api-key', process.env.API_KEY)
        .send({
          userId: '',
          userData: {
            email: 'invalid-email',
            displayName: ''
          }
        });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('Security Headers', () => {
    it('should set security headers', async () => {
      const response = await request(app)
        .get('/api/users/123')
        .set('x-api-key', process.env.API_KEY);
      
      expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-xss-protection']).toBe('1; mode=block');
      expect(response.headers['strict-transport-security']).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle errors securely', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .set('x-api-key', process.env.API_KEY);
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
      expect(response.body.stack).toBeUndefined();
    });
  });
});
