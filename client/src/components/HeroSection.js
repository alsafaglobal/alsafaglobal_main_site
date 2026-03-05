import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import './HeroSection.css';

const HeroSection = ({
  bannerImageUrl,
  bannerAlt,
  heroTitle,
  heroSubtitle,
  introTextBlocks,
  heroSideImageUrl,
  heroSideAlt,
  heroStats,
  brandText,
  brandColor
}) => {
  return (
    <>
      {/* Landing Page Banner Image */}
      <section className="landing-banner">
        <img 
          src={bannerImageUrl || "/images/banner.jpg"} 
          alt={bannerAlt || "Al Safa Global"} 
          className="landing-banner-image"
          onLoad={() => console.log('Hero landing image loaded successfully')}
          onError={(e) => {
            console.error('Error loading hero landing image:', e);
            console.error('Attempted URL:', bannerImageUrl || "/images/banner.jpg");
          }}
        />
      </section>
      
      <section className="hero-section">
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroTitle ? (
                (() => {
                  const brandTextValue = brandText || "Al Safa Global";
                  const parts = heroTitle.split(brandTextValue);
                  if (parts.length > 1) {
                    return (
                      <>
                        {parts[0]}
                        <span
                          style={{
                            color: brandColor === 'gold'
                              ? '#f59e0b'
                              : 'currentColor',
                          }}
                          data-cms-key="hero.brandText"
                          data-cms-field="brandColor"
                        >
                          {brandTextValue}
                        </span>
                        {parts[1]}
                      </>
                    );
                  }
                  return <span>{heroTitle}</span>;
                })()
              ) : (
                <>
                  Welcome to{' '}
                  <span
                    style={{
                      color: brandColor === 'gold'
                        ? '#f59e0b'
                        : 'currentColor',
                    }}
                    data-cms-key="hero.brandText"
                    data-cms-field="brandColor"
                  >
                    {brandText || 'Al Safa Global'}
                  </span>
                </>
              )}
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle-stylish"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {heroSubtitle || 'Your Trusted Partner in Procurement and Supply Chain Solutions'}
            </motion.p>
            {introTextBlocks?.length ? (
              introTextBlocks.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                >
                  {p?.children?.[0]?.text}
                </motion.p>
              ))
            ) : (
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Al Safa Global General Trading FZ LLC is a UAE-based company specializing in comprehensive 
                procurement and supply chain solutions. Headquartered in Ras Al Khaimah, we proudly serve 
                businesses and projects within the UAE and internationally — across the Construction, 
                Industrial, Marine, Aerospace, Defence, IT, and Office Supplies sectors.
              </motion.p>
            )}
            
            {/* Mobile-only image display */}
            <motion.div 
              className="hero-visual-mobile"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="hero-image-container">
                <div className="hero-main-image">
                  <img 
                    src={heroSideImageUrl || "/images/hero.png"} 
                    alt={heroSideAlt || "Global Procurement"} 
                    className="hero-image"
                    onLoad={() => console.log('Mobile global procurement image loaded successfully')}
                    onError={(e) => {
                      console.error('Error loading mobile global procurement image:', e);
                      console.error('Attempted URL:', heroSideImageUrl || "/images/hero.png");
                    }}
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Link to="/contact" className="btn btn-primary btn-large">
                Contact Us
                <FiArrowRight />
              </Link>
              
              <Link to="/divisions" className="btn btn-secondary btn-large">
                Explore Our Divisions
                <FiArrowRight />
              </Link>
            </motion.div>
            
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {(heroStats && heroStats.length ? heroStats : [
                { number: '500+', label: 'Satisfied Clients' },
                { number: '15+', label: 'Years Experience' },
                { number: '50+', label: 'Global Partners' },
                { number: '24/7', label: 'Support Available' }
              ]).map((s, i) => (
                <div className="stat-item" key={i}>
                  <span className="stat-number">{s?.number}</span>
                  <span className="stat-label">{s?.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-image-container">
              <div className="hero-main-image">
                <img 
                  src={heroSideImageUrl || "/images/hero.png"} 
                  alt={heroSideAlt || "Global Procurement"} 
                  className="hero-image"
                  onLoad={() => console.log('Desktop global procurement image loaded successfully')}
                  onError={(e) => {
                    console.error('Error loading desktop global procurement image:', e);
                    console.error('Attempted URL:', heroSideImageUrl || "/images/hero.png");
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div 
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ↓
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>

      
    </section>
    </>
  );
};

export default HeroSection; 