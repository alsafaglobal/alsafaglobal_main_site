const express = require('express');
const { body, validationResult } = require('express-validator');
const sendEmail = require('../utils/email');
const router = express.Router();

// POST /api/subscribe - Newsletter subscription
router.post('/', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // Send welcome email to subscriber
    const welcomeEmailData = {
      to: email,
      subject: 'Welcome to Al Safa Global Newsletter',
      template: 'newsletter-welcome',
      context: { email }
    };

    await sendEmail(welcomeEmailData);

    // Notify admin
    const adminEmailData = {
      to: process.env.EMAIL_FROM,
      subject: 'New Newsletter Subscriber',
      template: 'newsletter-admin',
      context: { email, date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
    };

    sendEmail(adminEmailData).catch(err => {
      console.error('Admin notification email failed:', err);
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing! A welcome email has been sent to your inbox.'
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
});

module.exports = router;
