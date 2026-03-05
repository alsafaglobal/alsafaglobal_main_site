import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiTarget, 
  FiEye, 
  FiUsers, 
  FiAward, 
  FiGlobe, 
  FiShield,
  FiCheckCircle,
  FiTrendingUp,
  FiClock,
  FiMail,
  FiMapPin
} from 'react-icons/fi';
import './About.css';
import { client } from '../sanityClient';
import { aboutPageQuery } from '../queries/aboutPageQuery';
import { homePageQuery } from '../queries/homePageQuery';
import { highlightBrand } from '../components/BrandText';
import BrandText from '../components/BrandText';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // State to track if brands have been animated in this page visit
  const [brandsAnimated, setBrandsAnimated] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [homeData, setHomeData] = useState(null);

  // Add intersection observer for brand items
  const [brandsRef, brandsInView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Effect to handle brand animation trigger - only once per page visit
  useEffect(() => {
    if (brandsInView && !brandsAnimated) {
      setBrandsAnimated(true);
    }
  }, [brandsInView, brandsAnimated]);

  useEffect(() => {
    client.fetch(aboutPageQuery).then(setAboutData);
  }, []);

  useEffect(() => {
    client.fetch(homePageQuery).then(setHomeData);
  }, []);

  const values = [
    {
      icon: <FiShield />,
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices in all our dealings."
    },
    {
      icon: <FiGlobe />,
      title: "Global Excellence",
      description: "We maintain the highest standards of quality and service across all our operations."
    },
    {
      icon: <FiUsers />,
      title: "Partnership",
      description: "We build long-term relationships based on trust, collaboration, and mutual success."
    },
    {
      icon: <FiTrendingUp />,
      title: "Innovation",
      description: "We continuously improve our processes and solutions to meet evolving market needs."
    }
  ];

  const achievements = [
    { number: "500+", label: "Satisfied Clients", icon: <FiUsers /> },
    { number: "15+", label: "Years Experience", icon: <FiClock /> },
    { number: "50+", label: "Global Partners", icon: <FiGlobe /> },
    { number: "100%", label: "Quality Assurance", icon: <FiAward /> }
  ];

  const services = [
    "End-to-End Procurement Solutions",
    "Global Sourcing & Supply",
    "Integrated Logistics Management",
    "Cost-Effective Sourcing",
    "Timely & Reliable Delivery",
    "Industry-Specific Procurement Expertise",
    "Supplier Management",
    "Operational Procurement Support",
    "Project Procurement Support",
    "Supply Chain Optimization Consulting"
  ];

  const sectorSolutions = [
    "Construction & Infrastructure Supply",
    "Oil & Gas Equipment & Consumables",
    "Industrial & Manufacturing Support",
    "Marine & Shipping Supplies",
    "Aviation Support Services",
    "Defence Sector Procurement",
    "Office & IT Solutions"
  ];

  const valueAddedServices = [
    "Supply of Genuine OEM Parts",
    "Competitive Quotation (RFQ) Response",
    "Partnership & Collaboration"
  ];

  const brands = [
    { name: "HP", image: process.env.PUBLIC_URL + "/images/brands/hp-logo.png" },
    { name: "IBM", image: process.env.PUBLIC_URL + "/images/brands/ibm-logo.png" },
    { name: "SCHNEIDER", image: process.env.PUBLIC_URL + "/images/brands/schneider-logo.png" },
    { name: "ABB", image: process.env.PUBLIC_URL + "/images/brands/abb-logo.png" },
    { name: "ALLEN BRADLEY", image: process.env.PUBLIC_URL + "/images/brands/allen-bradley-logo.png" },
    { name: "3M", image: process.env.PUBLIC_URL + "/images/brands/3m-logo.png" },
    { name: "CAT", image: process.env.PUBLIC_URL + "/images/brands/cat-logo.png" },
    { name: "MAKITA", image: process.env.PUBLIC_URL + "/images/brands/makita-logo.png" },
    { name: "CARRIER", image: process.env.PUBLIC_URL + "/images/brands/carrier-logo.png" },
    { name: "LG", image: process.env.PUBLIC_URL + "/images/brands/lg-logo.png" },
    { name: "ROSEMOUNT", image: process.env.PUBLIC_URL + "/images/brands/rosemount-logo.png" },
    { name: "EMERSON COPELAND", image: process.env.PUBLIC_URL + "/images/brands/emerson-copeland-logo.png" },
    { name: "YORK", image: process.env.PUBLIC_URL + "/images/brands/york-logo.png" },
    { name: "TRANE", image: process.env.PUBLIC_URL + "/images/brands/trane-logo.png" },
    { name: "DAIKIN", image: process.env.PUBLIC_URL + "/images/brands/daikin-logo.png" },
    { name: "MITSUBISHI ELECTRIC", image: process.env.PUBLIC_URL + "/images/brands/mitsubishi-electric-logo.png" },
    { name: "BOSCH", image: process.env.PUBLIC_URL + "/images/brands/bosch-logo.png" },
    { name: "JOHNSON CONTROLS", image: process.env.PUBLIC_URL + "/images/brands/johnson-controls-logo.png" },
    { name: "JOTUN", image: process.env.PUBLIC_URL + "/images/brands/jotun-logo.png" },
    { name: "NATIONAL PAINTS", image: process.env.PUBLIC_URL + "/images/brands/national-paints-logo.png" },
    { name: "CATERPILLAR", image: process.env.PUBLIC_URL + "/images/brands/caterpillar-logo.png" },
    { name: "FG-WILSON", image: process.env.PUBLIC_URL + "/images/brands/fg-wilson-logo.png" },
    { name: "PARKER FILTERS & INSTRUMENTS", image: process.env.PUBLIC_URL + "/images/brands/parker-filters-logo.png" }
  ];

  // CMS-driven replacements with safe fallbacks
  const valuesFromCMS = aboutData?.coreValues?.values
    ?.filter(v => v?.enabled !== false)
    ?.map((v, idx) => ({
      icon: values[idx % values.length]?.icon || <FiCheckCircle />,
      title: v?.title || values[idx % values.length]?.title || '',
      description: v?.description || values[idx % values.length]?.description || ''
    }));
  const valuesToRender = valuesFromCMS && valuesFromCMS.length ? valuesFromCMS : values;

  const coreServicesItems = aboutData?.whyChoose?.services?.coreServices?.items
    ?.filter(item => item?.enabled !== false)
    ?.map(item => item?.title || '') || services;

  const sectorServicesItems = aboutData?.whyChoose?.services?.sectorServices?.items
    ?.filter(item => item?.enabled !== false)
    ?.map(item => item?.title || '') || sectorSolutions;

  const valueAddedItems = aboutData?.whyChoose?.services?.valueAdded?.items
    ?.filter(item => item?.enabled !== false)
    ?.map(item => item?.title || '') || valueAddedServices;

  const brandsFromCMS = aboutData?.brandPartners?.logos
    ?.filter(l => l?.enabled !== false)
    ?.map(l => ({
      name: l?.image?.alt || 'Brand',
      image: l?.image?.asset?.url
    }));
  const brandsToRender = brandsFromCMS && brandsFromCMS.length ? brandsFromCMS : brands;

  const defaultAchievementIcons = [<FiUsers />, <FiClock />, <FiGlobe />, <FiAward />];
  const achievementsFromCMS = aboutData?.contactSection?.stats
    ?.filter(s => s?.enabled !== false)
    ?.map((s, idx) => ({
      number: s?.number || achievements[idx % achievements.length]?.number || '',
      label: s?.label || achievements[idx % achievements.length]?.label || '',
      icon: defaultAchievementIcons[idx % defaultAchievementIcons.length]
    }));
  const achievementsToRender = achievementsFromCMS && achievementsFromCMS.length
    ? achievementsFromCMS
    : achievements;

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 dangerouslySetInnerHTML={{ __html: highlightBrand(aboutData?.pageTitle || 'About Al Safa Global', homeData?.brandText || 'Al Safa Global', homeData?.brandColor) }} />

            {aboutData?.introText?.length
              ? aboutData.introText.map((p, i) => (
                  <p key={i}>{p?.children?.[0]?.text || ''}</p>
                ))
              : (
                <p>
                  Al Safa Global General Trading FZ LLC is a UAE-based company specializing in comprehensive 
                  procurement and supply chain solutions. Headquartered in Ras Al Khaimah, we proudly serve 
                  businesses and projects within the UAE and internationally — across the Construction, 
                  Industrial, Marine, Aerospace, Defence, IT, and Office Supplies sectors.
                </p>
              )
            }
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission">
        <div className="container">
          <div className="vision-mission-grid">
            <motion.div 
              className="vision-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-icon">
                <FiEye />
              </div>
              <h3>{aboutData?.vision?.title || 'Our Vision'}</h3>
              {aboutData?.vision?.text?.length
                ? aboutData.vision.text.map((p, i) => (
                    <p key={i}>{p?.children?.[0]?.text || ''}</p>
                  ))
                : (
                  <p>
                    To be a globally trusted procurement partner, known for delivering quality products, 
                    innovative solutions, and exceptional service that drive the success of projects and 
                    businesses across industries.
                  </p>
                )
              }
            </motion.div>

            <motion.div 
              className="mission-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card-icon">
                <FiTarget />
              </div>
              <h3>{aboutData?.mission?.title || 'Our Mission'}</h3>
              {aboutData?.mission?.text?.length
                ? aboutData.mission.text.map((p, i) => (
                    <p key={i}>{p?.children?.[0]?.text || ''}</p>
                  ))
                : (
                  <p>
                    To provide reliable, cost-effective sourcing and supply solutions for businesses in 
                    the UAE and across the globe. To represent and deliver world-renowned brands and 
                    products that meet the highest standards of quality and performance. To build long-term 
                    partnerships by exceeding client expectations with personalized service, integrity, 
                    and commitment to excellence.
                  </p>
                )
              }
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{aboutData?.coreValues?.title || 'Our Core Values'}</h2>
            <p className="section-subtitle">
              {aboutData?.coreValues?.subtitle || 'The principles that guide our business and relationships'}
            </p>
          </motion.div>

          <div className="values-grid">
            {valuesToRender.map((value, index) => (
              <motion.div
                key={value.title || index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us" ref={ref}>
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 dangerouslySetInnerHTML={{ __html: highlightBrand(aboutData?.whyChoose?.title || 'Why Choose Al Safa Global?', homeData?.brandText || 'Al Safa Global', homeData?.brandColor) }} />
            <p className="section-subtitle">
              {aboutData?.whyChoose?.subtitle || 'We combine industry expertise with innovative solutions to deliver exceptional value'}
            </p>
          </motion.div>

          <div className="features-grid">
            {(aboutData?.whyChoose?.features?.filter(f => f?.enabled !== false) || []).map((f, idx) => (
              <motion.div 
                key={idx}
                className="feature-item"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              >
                <FiCheckCircle className="feature-icon" />
                <div className="feature-content">
                  <h4>{f?.title || ''}</h4>
                  <p>{f?.description || ''}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="core-services">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{aboutData?.whyChoose?.services?.coreServices?.title || 'Core Procurement & Supply Chain Services'}</h2>
            <p className="section-subtitle">
              {aboutData?.whyChoose?.services?.coreServices?.subtitle || 'Comprehensive solutions tailored to your business needs'}
            </p>
          </motion.div>

          <div className="services-grid">
            {coreServicesItems.map((service, index) => (
              <motion.div
                key={service || index}
                className="service-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FiCheckCircle className="service-icon" />
                <span>{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector-Specific Solutions */}
      <section className="sector-solutions">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{aboutData?.whyChoose?.services?.sectorServices?.title || 'Sector-Specific Supply Solutions'}</h2>
            <p className="section-subtitle">
              {aboutData?.whyChoose?.services?.sectorServices?.subtitle || 'Specialized procurement services for different industries'}
            </p>
          </motion.div>

          <div className="solutions-grid">
            {sectorServicesItems.map((solution, index) => (
              <motion.div
                key={solution || index}
                className="solution-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FiCheckCircle className="solution-icon" />
                <span>{solution}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value-Added Services */}
      <section className="value-added-services">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{aboutData?.whyChoose?.services?.valueAdded?.title || 'Value-Added Services'}</h2>
            <p className="section-subtitle">
              {aboutData?.whyChoose?.services?.valueAdded?.subtitle || 'Additional benefits that set us apart from the competition'}
            </p>
          </motion.div>

          <div className="value-services-grid">
            {valueAddedItems.map((service, index) => (
              <motion.div
                key={service || index}
                className="value-service-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FiCheckCircle className="value-service-icon" />
                <span>{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="trusted-brands">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{aboutData?.brandPartners?.title || 'Trusted Brand Partners'}</h2>
            <p className="section-subtitle">
              {aboutData?.brandPartners?.subtitle || 'We source and supply materials from a wide network of reputed international brands, ensuring genuine quality and trusted performance'}
            </p>
          </motion.div>

          <motion.div 
            className="brands-grid"
            ref={brandsRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {(brandsToRender || []).map((brand, index) => (
              <motion.div
                key={brand.name || index}
                className={`brand-item ${brandsAnimated ? 'in-view' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={brandsAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={brand.image} 
                  alt={brand.name || ''}
                  onLoad={() => console.log(`${brand.name} logo loaded successfully`)}
                  onError={(e) => {
                    console.error(`Error loading ${brand.name} logo:`, e);
                    console.error('Attempted URL:', brand.image);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{aboutData?.contactSection?.title || 'Get In Touch'}</h2>
            <p className="section-subtitle">
              {aboutData?.contactSection?.subtitle || 'We would love to hear from you. For all inquiries, business proposals, or partnership opportunities, please reach out to us.'}
            </p>
          </motion.div>

          <motion.div 
            className="contact-details"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="contact-item">
              <FiMail className="contact-icon" />
              <div>
                <h4>Email</h4>
                <p>
                  <a href={`mailto:${aboutData?.contactSection?.email || 'info@alsafaglobal.com'}`} style={{ color: 'inherit', textDecoration: 'underline', wordBreak: 'break-all' }}>
                    {aboutData?.contactSection?.email || 'info@alsafaglobal.com'}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="contact-item">
              <FiMapPin className="contact-icon" />
              <div>
                <h4>Address</h4>
                {aboutData?.contactSection?.address?.length
                  ? aboutData.contactSection.address.map((p, i) => (
                      <p key={i}>{p?.children?.[0]?.text || ''}</p>
                    ))
                  : (
                    <p>
                      AL SAFA GLOBAL GENERAL TRADING FZ LLC<br />
                      FDBC3472<br />
                      Compass Building, Al Shohada Road<br />
                      Al Hamra Industrial Zone-FZ<br />
                      P.O. Box 10055<br />
                      Ras Al Khaimah, United Arab Emirates<br />
                      <a href="tel:0097143741969" style={{ color: 'inherit', textDecoration: 'underline' }}>00971 4 3741 969</a>
                    </p>
                  )
                }
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <div className="container">
          <div className="achievements-grid">
            {achievementsToRender.map((achievement, index) => (
              <motion.div
                key={achievement.label || index}
                className="achievement-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="achievement-icon">
                  {achievement.icon}
                </div>
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 