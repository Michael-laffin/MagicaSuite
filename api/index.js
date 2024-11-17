require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const stripeRoutes = require('./routes/stripe');
const stripe = require('stripe')(process.env.VITE_STRIPE_SECRET_KEY);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// Initialize Firestore
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Special middleware for Stripe webhooks
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// Use Stripe routes
app.use('/api', stripeRoutes);

app.post('/api/users', async (req, res) => {
  try {
    const { userId, userData } = req.body;
    await db.collection('users').doc(userId).set({
      ...userData,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    
    await db.collection('users').doc(userId).update({
      ...updateData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/update-payment-status', async (req, res) => {
  try {
    const { userId, status } = req.body;
    // Here you would typically update the user's payment status in your database
    console.log('Updating payment status for user:', userId, 'to:', status);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
