import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiShield, 
  FiGlobe, 
  FiClock, 
  FiUsers, 
  FiAward,
  FiTruck,
  FiTrendingUp,
  FiCheckCircle,
  FiPackage,
  FiLink
} from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import EventBanner from '../components/EventBanner';
import FeatureCard from '../components/FeatureCard';
import DivisionCard from '../components/DivisionCard';
import StatsSection from '../components/StatsSection';
import TestimonialSection from '../components/TestimonialSection';
import CtaSection from '../components/CtaSection';
import './Home.css';
import { client, urlFor } from '../sanityClient';
import { homePageQuery } from '../queries/homePageQuery';
import { highlightBrand } from '../components/BrandText';
import BrandText from '../components/BrandText';

const Home = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [cardsScrolled, setCardsScrolled] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    client.fetch(homePageQuery).then(data => setHomeData(data));
  }, []);

  // Check if user is revisiting the home page
  useEffect(() => {
    const hasVisitedOtherPages = sessionStorage.getItem('hasVisitedOtherPages');
    if (hasVisitedOtherPages === 'true') {
      // Reset cards if user is revisiting after visiting other pages
      setCardsScrolled({
        card1: false,
        card2: false,
        card3: false,
        card4: false,
        card5: false
      });
      setHasTransitioned(false);
      sessionStorage.removeItem('hasVisitedOtherPages');
    }
  }, []);

  // Track when user leaves home page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasTransitioned) {
        sessionStorage.setItem('hasVisitedOtherPages', 'true');
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && hasTransitioned) {
        sessionStorage.setItem('hasVisitedOtherPages', 'true');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasTransitioned]);

  // Handle scroll effect for floating cards in mobile
  useEffect(() => {
    const handleScroll = () => {
      const cardsContainer = document.querySelector('.image-container');
      if (cardsContainer) {
        const rect = cardsContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        
        // Check if cards are in viewport (mobile only)
        if (window.innerWidth <= 767) {
          if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            // Only trigger transitions when scrolling down and haven't transitioned yet
            if (isScrollingDown && !hasTransitioned) {
              // Trigger cards one by one with staggered timing
              setTimeout(() => setCardsScrolled(prev => ({ ...prev, card1: true })), 0);
              setTimeout(() => setCardsScrolled(prev => ({ ...prev, card2: true })), 200);
              setTimeout(() => setCardsScrolled(prev => ({ ...prev, card3: true })), 400);
              setTimeout(() => setCardsScrolled(prev => ({ ...prev, card4: true })), 600);
              setTimeout(() => setCardsScrolled(prev => ({ ...prev, card5: true })), 800);
              setHasTransitioned(true); // Mark as transitioned permanently
            }
          }
        }
        setLastScrollY(currentScrollY);
      }
    };

    // Only add scroll listener on mobile
    if (window.innerWidth <= 767) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, hasTransitioned]);

  const features = [
    {
      icon: <FiGlobe />,
      title: "Global Sourcing Network",
      description: "Direct access to reputed brands and suppliers worldwide for comprehensive procurement solutions."
    },
    {
      icon: <FiTruck />,
      title: "End-to-End Solutions",
      description: "Complete procurement and logistics management from sourcing to delivery coordination."
    },
    {
      icon: <FiTrendingUp />,
      title: "Competitive Pricing",
      description: "Cost-effective sourcing without compromising on quality or authenticity of products."
    },
    {
      icon: <FiClock />,
      title: "Timely Delivery",
      description: "Committed to meeting project deadlines and operational schedules with responsive turnaround."
    },
    {
      icon: <FiUsers />,
      title: "Industry Expertise",
      description: "Experienced team with deep industry-specific knowledge across multiple sectors."
    },
    {
      icon: <FiShield />,
      title: "Quality Assurance",
      description: "Rigorous quality control and genuine OEM parts guarantee for all products and services."
    }
  ];

  const divisions = [
    {
      title: "Office, Construction & Infrastructure",
      description: "Comprehensive sourcing for building materials, tools, safety gear, MEP systems, IT hardware/software, and site essentials.",
      icon: "🏢",
      color: "var(--primary-blue)",
      link: "/divisions#office-construction"
    },
    {
      title: "Oil & Gas",
      description: "Supply chain solutions for drilling, production, maintenance, safety, and instrumentation needs (upstream & downstream).",
      icon: "⚡",
      color: "var(--accent-orange)",
      link: "/divisions#oil-gas"
    },
    {
      title: "Industrial & Manufacturing",
      description: "Providing MRO supplies, automation components, PPE, bearings, motors, spare parts, and factory-grade consumables.",
      icon: "🏭",
      color: "var(--primary-blue-dark)",
      link: "/divisions#industrial-manufacturing"
    },
    {
      title: "Aviation, Marine & Shipping",
      description: "Sourcing engine parts, navigation equipment, deck machinery, safety gear, paints, coatings, and vessel maintenance items.",
      icon: "✈️",
      color: "var(--accent-blue)",
      link: "/divisions#aviation-marine"
    },
    {
      title: "Defence Sector",
      description: "Discreet and reliable sourcing of tactical gear, technical equipment, uniforms, field supplies, and maintenance parts.",
      icon: "🛡️",
      color: "var(--text-primary)",
      link: "/divisions#defence-sector"
    }
  ];

  const statsToRender = homeData?.ctaSection?.stats?.filter(s => s?.enabled !== false) || [];

  const cmsSegments = homeData?.segmentsPreview?.segments?.filter(s => s?.enabled !== false);
  const defaultColors = ["var(--primary-blue)", "var(--accent-orange)", "var(--primary-blue-dark)", "var(--accent-blue)", "var(--text-primary)"];
  const divisionsFromCMS = cmsSegments?.map((s, index) => ({
    title: s?.title || divisions[index % divisions.length]?.title,
    description: s?.description || divisions[index % divisions.length]?.description,
    icon: s?.icon || divisions[index % divisions.length]?.icon,
    color: defaultColors[index % defaultColors.length],
    link: s?.buttonLink || '/divisions'
  }));
  const divisionsToRender = divisionsFromCMS && divisionsFromCMS.length ? divisionsFromCMS : divisions;

  const cmsFeatures = homeData?.whyChoose?.features?.filter(f => f?.enabled !== false)?.map(f => ({
    icon: <FiCheckCircle />,
    title: f?.title || '',
    description: f?.description || ''
  }));
  const featuresToRender = cmsFeatures && cmsFeatures.length ? cmsFeatures : features;

  return (
    <div className="home-page">
      {/* 1. Hero Section - Welcoming */}
      <HeroSection
        bannerImageUrl={homeData?.bannerImage?.asset?.url}
        bannerAlt={homeData?.bannerImage?.alt}
        heroTitle={homeData?.heroTitle}
        heroSubtitle={homeData?.heroSubtitle}
        introTextBlocks={homeData?.introText}
        heroSideImageUrl={homeData?.heroSideImage ? urlFor(homeData.heroSideImage).url() : undefined}
        heroSideAlt={homeData?.heroSideImage?.alt}
        heroStats={homeData?.stats}
        brandText={homeData?.brandText}
        brandColor={homeData?.brandColor}
      />

      <EventBanner events={homeData?.homeEvents} />

      {/* 2. About Al Safa Global */}
      <section className="about-preview-section" ref={ref}>
        <div className="container">
          <div className="about-preview-content">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2>
                {homeData?.aboutPreview?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightBrand(
                        homeData.aboutPreview.title,
                        homeData?.brandText || 'Al Safa Global',
                        homeData?.brandColor
                      )
                    }}
                  />
                ) : (
                  <>About <BrandText brandText={homeData?.brandText} brandColor={homeData?.brandColor} /></>
                )}
              </h2>
              {homeData?.aboutPreview?.body?.length
                ? homeData.aboutPreview.body.map((p, i) => (
                    <p key={i}>{p?.children?.[0]?.text}</p>
                  ))
                : (
                  <>
                    <p>
                      Al Safa Global General Trading FZ LLC is a UAE-based company specializing in comprehensive 
                      procurement and supply chain solutions. Headquartered in Ras Al Khaimah, we proudly serve 
                      businesses and projects within the UAE and internationally — across the Construction, 
                      Industrial, Marine, Aerospace, Defence, IT, and Office Supplies sectors.
                    </p>
                    <p>
                      We partner with globally recognized brands and supply high-quality products that meet 
                      international standards. Whether supporting complex industrial projects, critical defense 
                      requirements, specialized marine and aerospace needs, or everyday office and IT demands, 
                      we ensure reliable and efficient sourcing for our clients worldwide.
                    </p>
                    <p>
                      Our strength lies in delivering cost-effective, timely, and dependable procurement 
                      solutions, backed by a deep understanding of market dynamics and logistical challenges. 
                      We position ourselves as a trusted partner — committed to helping clients achieve 
                      operational efficiency, project success, and sustainable growth.
                    </p>
                  </>
                )
              }
              <div className="about-features">
                {homeData?.aboutPreview?.highlights?.filter(h => h?.enabled !== false)?.length
                  ? homeData.aboutPreview.highlights.filter(h => h?.enabled !== false).map((h, i) => (
                      <div className="feature-item" key={i}>
                        <FiCheckCircle className="feature-icon" />
                        <span>{h?.title}</span>
                      </div>
                    ))
                  : (
                    <>
                      <div className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>End-to-End Procurement Solutions</span>
                      </div>
                      <div className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>Global Sourcing & Supply</span>
                      </div>
                      <div className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>Integrated Logistics Management</span>
                      </div>
                    </>
                  )
                }
              </div>
            </motion.div>

            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Company overview image above floating cards */}
              <div className="company-image-wrapper">
                <img 
                  src={homeData?.aboutPreview?.image ? urlFor(homeData.aboutPreview.image).url() : "/images/company-overview.jpg"} 
                  alt={homeData?.aboutPreview?.image?.alt || "Al Safa Global Company Overview"} 
                  className="company-overview-image"
                />
              </div>
              
              <div className="image-container">
                <div className={`floating-card card-1 ${cardsScrolled.card1 ? 'scrolled' : ''}`}>
                  <FiTrendingUp />
                  <span>Growth</span>
                </div>
                <div className={`floating-card card-2 ${cardsScrolled.card2 ? 'scrolled' : ''}`}>
                  <FiGlobe />
                  <span>Global</span>
                </div>
                <div className={`floating-card card-3 ${cardsScrolled.card3 ? 'scrolled' : ''}`}>
                  <FiAward />
                  <span>Quality</span>
                </div>
                <div className={`floating-card card-4 ${cardsScrolled.card4 ? 'scrolled' : ''}`}>
                  <FiPackage />
                  <span>Procurement</span>
                </div>
                <div className={`floating-card card-5 ${cardsScrolled.card5 ? 'scrolled' : ''}`}>
                  <FiLink />
                  <span>Supply Chain</span>
                </div>
              </div>
            </motion.div>

            {/* Learn More About Us Button - positioned after floating cards */}
            <motion.div 
              className="about-cta-button"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/about" className="btn btn-primary">
                {homeData?.aboutPreview?.buttonLabel || 'Learn More About Us'}
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Our Business Segments */}
      <section className="divisions-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{homeData?.segmentsPreview?.title || 'Our Business Segments'}</h2>
            <p className="section-subtitle">
              {homeData?.segmentsPreview?.subtitle || 'Al Safa Global specializes in a wide array of supply and service segments'}
            </p>
          </motion.div>

          <div className="divisions-grid">
            {divisionsToRender.map((division, index) => (
              <motion.div
                key={division.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <DivisionCard {...division} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Al Safa Global */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              dangerouslySetInnerHTML={{
                __html: highlightBrand(
                  homeData?.whyChoose?.title || 'Why Choose Al Safa Global?',
                  homeData?.brandText || 'Al Safa Global',
                  homeData?.brandColor
                )
              }}
            />
            <p className="section-subtitle">
              {homeData?.whyChoose?.subtitle || 'We combine industry expertise with innovative solutions to deliver exceptional value to our clients'}
            </p>
          </motion.div>

          <div className="features-grid">
            {featuresToRender.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Ready to Get Started - CTA Section */}
      <CtaSection
        title={homeData?.ctaSection?.title}
        subtitle={homeData?.ctaSection?.subtitle}
        primaryButton={homeData?.ctaSection?.primaryButton}
        secondaryButton={homeData?.ctaSection?.secondaryButton}
      />

      {/* 6. Trusted Brand Partners - Stats Section */}
      <StatsSection stats={statsToRender} />

      {/* 7. Get in Touch - Testimonials Section */}
      <TestimonialSection
        title={homeData?.testimonials?.title}
        subtitle={homeData?.testimonials?.subtitle}
        items={homeData?.testimonials?.items?.filter(t => t?.enabled !== false)}
      />
    </div>
  );
};

export default Home; 