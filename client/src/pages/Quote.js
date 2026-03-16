import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './Quote.css';

const Quote = () => {
  const { state } = useLocation();
  const product = state || null; // { brandName, modelName, price }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const productInfo = product
      ? `Product: ${product.brandName || ''} ${product.modelName || ''}\nPrice: ${product.price || 'N/A'}`
      : 'No specific product selected';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: '',
          subject: product
            ? `Quote Request - ${product.brandName} ${product.modelName}`
            : 'Quote Request',
          message: `${productInfo}\n\nCustomer is requesting a quote for the above product.`,
          division: 'General Inquiry'
        })
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Quote form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="quote-page">
      <div className="quote-container">
        <motion.div
          className="quote-form-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="quote-header">
            <h1 className="quote-title">
              Request a <span>Quote</span>
            </h1>
            <p className="quote-subtitle">
              Fill in your details below and we'll get back to you with a competitive quotation.
            </p>
          </div>

          {/* Pre-filled product info */}
          {product && (
            <div className="quote-product-info">
              <h3>Product Details</h3>
              {product.brandName && <p><strong>Brand:</strong> {product.brandName}</p>}
              {product.modelName && <p><strong>Model:</strong> {product.modelName}</p>}
              {product.price && <p><strong>Price:</strong> {product.price}</p>}
            </div>
          )}

          {submitStatus === 'success' && (
            <motion.div
              className="alert alert-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Quote Request Sent!</h3>
              <p>Thank you! We have received your request and will get back to you shortly.</p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              className="alert alert-error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Something went wrong</h3>
              <p>Please try again or contact us directly at info@alsafaglobal.com</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="quote-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Full Name *"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number *"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary btn-large quote-submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Quote;
