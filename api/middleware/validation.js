import { z } from 'zod';

// User schema validation
const userSchema = z.object({
  userId: z.string().min(1),
  userData: z.object({
    email: z.string().email(),
    displayName: z.string().min(1),
    photoURL: z.string().url().optional(),
  }),
});

// Payment schema validation
const paymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  customerId: z.string().min(1),
});

// Validation middleware factory
export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      });
    }
  };
};

// Export specific validators
export const validateUserData = validateRequest(userSchema);
export const validatePayment = validateRequest(paymentSchema);

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors,
    });
  }
  
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
};
