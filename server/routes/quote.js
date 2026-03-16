const express = require('express');
const { body, validationResult } = require('express-validator');
const sendEmail = require('../utils/email');
const router = express.Router();

router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().isLength({ min: 5, max: 30 }).withMessage('Phone number is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, phone, brandName, modelName, price } = req.body;

    // Send to info@alsafaglobal.com
    await sendEmail({
      to: 'info@alsafaglobal.com',
      subject: `New Quote Request - ${brandName || 'Product'} ${modelName || ''}`.trim(),
      template: 'quote-request',
      context: {
        name,
        email,
        phone,
        brandName: brandName || 'N/A',
        modelName: modelName || 'N/A',
        price: price || 'N/A',
        date: new Date().toLocaleString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
      }
    });

    // Send confirmation to customer
    await sendEmail({
      to: email,
      template: 'quote-confirmation',
      context: {
        name,
        brandName: brandName || 'N/A',
        modelName: modelName || 'N/A',
        price: price || 'N/A'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Your quote request has been sent successfully!'
    });

  } catch (error) {
    console.error('Quote submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to send quote request. Please try again.' });
  }
});

module.exports = router;
