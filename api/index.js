require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Initialize Firebase Admin
let serviceAccount;
try {
  serviceAccount = require('./firebase-service-account.json');
  if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
    throw new Error('Invalid service account file: missing required fields');
  }
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id // Use project_id from service account
  });
  console.log('Firebase Admin initialized successfully with project:', serviceAccount.project_id);
} catch (error) {
  console.error('Error initializing Firebase Admin:', {
    message: error.message,
    stack: error.stack,
    code: error.code
  });
  process.exit(1); // Exit if Firebase Admin fails to initialize
}

const app = express();
const port = process.env.PORT || 3001;

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    path: req.path,
    headers: {
      ...req.headers,
      authorization: req.headers.authorization ? '[REDACTED]' : undefined
    },
    body: req.body
  });
  next();
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user.js');

// API Routes
app.use('/api', userRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    code: err.code
  });
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Firebase project ID:', serviceAccount.project_id);
});
