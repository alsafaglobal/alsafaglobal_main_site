import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import './EventRegistrationModal.css';

const EventRegistrationModal = ({ isOpen, onClose, eventName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSubmitStatus(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const safeEventName = eventName || 'Event';
      const subject = `Event Registration Request - ${safeEventName}`;

      const emailBody = `
Event Registration Request

Event: ${safeEventName}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
      `.trim();

      const mailtoUrl = `mailto:info@alsafaglobal.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(emailBody)}`;

      // Reuse Contact page behavior: open default email client
      window.open(mailtoUrl, '_blank');

      setSubmitStatus('success');

      // Reset form, then close modal
      setFormData({ name: '', email: '', phone: '' });
      setTimeout(() => onClose?.(), 300);
    } catch (error) {
      setSubmitStatus('error');
      // eslint-disable-next-line no-console
      console.error('Error opening email client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="event-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            // close if clicking backdrop
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
          <motion.div
            className="event-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Event registration"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              type="button"
              className="event-modal-close"
              onClick={() => onClose?.()}
              aria-label="Close"
            >
              <FiX />
            </button>

            <div className="event-modal-header">
              <h3 className="event-modal-title">Register your interest</h3>
              <p className="event-modal-subtitle">
                {eventName ? <>Event: <strong>{eventName}</strong></> : 'Event registration request'}
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="event-modal-alert event-modal-alert-success">
                <h4>Email Client Opened!</h4>
                <p>Please review and send the email to info@alsafaglobal.com.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="event-modal-alert event-modal-alert-error">
                <h4>Something went wrong</h4>
                <p>Please try again or email info@alsafaglobal.com directly.</p>
              </div>
            )}

            <form className="event-modal-form" onSubmit={handleSubmit}>
              <div className="event-modal-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="event-modal-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="event-modal-field">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="event-modal-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Opening Email...' : 'Submit'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default EventRegistrationModal;

