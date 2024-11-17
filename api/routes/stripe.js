const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');

// Create a Stripe Checkout Session
router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.VITE_STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:5173/canceled',
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// Webhook handler for asynchronous events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle specific events
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Handle successful payment
            console.log('Payment successful for session:', session.id);
            // Add your business logic here (e.g., activate subscription, send email, etc.)
            break;
            
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            const subscription = event.data.object;
            // Handle subscription updates
            console.log('Subscription updated:', subscription.id);
            // Add your subscription update logic here
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
});

// Get subscription status
router.get('/subscription/:customerId', async (req, res) => {
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: req.params.customerId,
            status: 'active',
            limit: 1,
        });

        res.json({
            active: subscriptions.data.length > 0,
            subscription: subscriptions.data[0] || null,
        });
    } catch (error) {
        console.error('Error fetching subscription:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create a portal session for managing subscriptions
router.post('/create-portal-session', async (req, res) => {
    try {
        const { customerId } = req.body;
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${req.headers.origin}/account`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating portal session:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
