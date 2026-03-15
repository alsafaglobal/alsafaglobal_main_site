import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiMapPin,
  FiPhone
} from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscribeEmail })
      });
      const data = await res.json();
      if (data.success) {
        setSubscribeStatus('success');
        setSubscribeMessage(data.message);
        setSubscribeEmail('');
      } else {
        setSubscribeStatus('error');
        setSubscribeMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubscribeStatus('error');
      setSubscribeMessage('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo">
              <h3>Al Safa Global</h3>
            </div>
            <div className="footer-contact">
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <a href="mailto:info@alsafaglobal.com" className="contact-link">
                  info@alsafaglobal.com
                </a>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <div className="contact-phones">
                  <div>
                    <span>Office: </span><a href="tel:0097143741969" className="contact-link">00971 4 3741 969</a>
                  </div>
                  <div>
                    <span>Mobile:</span><a href="tel:00971505671441" className="contact-link">00971 50 5671441</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>Ras Al Khaimah, UAE</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/divisions">Segments</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li>Office, Construction & Infrastructure</li>
              <li>Oil & Gas</li>
              <li>Industrial & Manufacturing</li>
              <li>Aviation & Marine</li>
              <li>Defence Sector</li>
            </ul>
          </motion.div>

          {/* Footer Image */}
          <motion.div 
            className="footer-section footer-image-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="footer-image-wrapper">
              <img 
                src="/images/footer-image.jpg" 
                alt="Al Safa Global" 
                className="footer-image"
              />
            </div>
          </motion.div>
        </div>

        {/* Newsletter Subscribe */}
        <motion.div
          className="footer-subscribe"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4>Stay Updated</h4>
          <p>Subscribe to receive news and updates from Al Safa Global.</p>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              required
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
            />
            <button
              type="submit"
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
            >
              {subscribeStatus === 'loading' ? 'Sending...' : subscribeStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subscribeStatus === 'success' && (
            <p className="subscribe-msg subscribe-success">{subscribeMessage}</p>
          )}
          {subscribeStatus === 'error' && (
            <p className="subscribe-msg subscribe-error">{subscribeMessage}</p>
          )}
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Al Safa Global General Trading FZ LLC. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 