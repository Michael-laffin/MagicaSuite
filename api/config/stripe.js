const stripe = require('stripe')(process.env.VITE_STRIPE_SECRET_KEY);

module.exports = stripe;
