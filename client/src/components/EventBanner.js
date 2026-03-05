import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { urlFor } from '../sanityClient';
import './EventBanner.css';
import EventRegistrationModal from './EventRegistrationModal';

const ROTATE_INTERVAL_MS = 5000;

const EventBanner = ({ events = [] }) => {
  const enabledEvents = (events || []).filter((e) => e?.enabled === true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState('');

  useEffect(() => {
    if (enabledEvents.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % enabledEvents.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [enabledEvents.length]);

  if (enabledEvents.length === 0) return null;

  const currentEvent = enabledEvents[activeIndex];
  const bgUrl = currentEvent?.background?.asset?.url
    ? urlFor(currentEvent.background).url()
    : null;

  const CtaButton = () => {
    const label = currentEvent?.ctaLabel;
    if (!label) return null;
    return (
      <button
        type="button"
        className="event-banner-cta"
        onClick={() => {
          setSelectedEventName(currentEvent?.title || 'Event');
          setIsModalOpen(true);
        }}
      >
        {label}
        <FiArrowRight />
      </button>
    );
  };

  return (
    <>
      <section
        className="event-banner"
        aria-live="polite"
        aria-label="Event banner"
      >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="event-banner-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div
            className="event-banner-bg"
            style={
              bgUrl
                ? { backgroundImage: `url(${bgUrl})` }
                : { backgroundColor: '#f8fafc' }
            }
          />
          <div className="container event-banner-content">
            <div className="event-banner-text">
              {currentEvent?.title && (
                <h2 className="event-banner-title">{currentEvent.title}</h2>
              )}
              {currentEvent?.subtitle && (
                <p className="event-banner-subtitle">{currentEvent.subtitle}</p>
              )}
            </div>
            <div className="event-banner-actions">
              <CtaButton />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {enabledEvents.length > 1 && (
        <div className="event-banner-dots" aria-hidden="true">
          {enabledEvents.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`event-banner-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to event ${i + 1}`}
            />
          ))}
        </div>
      )}
      </section>

      <EventRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventName={selectedEventName}
      />
    </>
  );
};

export default EventBanner;
