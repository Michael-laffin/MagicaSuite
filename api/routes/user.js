const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log('No authorization header');
            return res.status(401).json({ error: 'No authorization header' });
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            console.log('Invalid authorization format');
            return res.status(401).json({ error: 'Invalid authorization format' });
        }

        console.log('Verifying token...');
        try {
            const decodedToken = await admin.auth().verifyIdToken(token, true);
            req.user = decodedToken;
            console.log('Token verified for user:', decodedToken.uid);
            next();
        } catch (verifyError) {
            console.error('Token verification failed:', verifyError);
            if (verifyError.code === 'auth/id-token-expired') {
                return res.status(401).json({ error: 'Token expired' });
            }
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error in verifyToken middleware:', error);
        res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

// Get user stats
router.get('/user-stats', verifyToken, async (req, res) => {
    try {
        console.log('Fetching stats for user:', req.user.uid);
        
        // Mock stats data - replace with actual database queries later
        const stats = {
            activeProjects: 0,
            projectsChange: 0,
            teamMembers: 0,
            teamChange: 0,
            monthlyCost: 0,
            costChange: 0,
            magicPoints: 0,
            pointsChange: 0,
            tasksCompleted: 0,
            tasksChange: 0,
            timeSaved: 0,
            timeChange: 0,
            aiCredits: 0,
            creditsChange: 0,
            storageUsed: 0,
            storageChange: 0
        };

        console.log('Sending stats for user:', req.user.uid);
        res.json(stats);
    } catch (error) {
        console.error('Error in /user-stats:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        res.status(500).json({ 
            error: 'Failed to fetch user stats',
            details: error.message
        });
    }
});

// Get subscription status
router.get('/subscription-status', verifyToken, async (req, res) => {
    try {
        console.log('Fetching subscription for user:', req.user.uid);

        // Mock subscription data - replace with actual Stripe integration later
        const subscription = {
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };

        console.log('Sending subscription data for user:', req.user.uid);
        res.json(subscription);
    } catch (error) {
        console.error('Error in /subscription-status:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        res.status(500).json({ 
            error: 'Failed to fetch subscription status',
            details: error.message
        });
    }
});

module.exports = router;
