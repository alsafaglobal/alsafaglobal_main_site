import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { client } from '../sanityClient';
import { segmentsPageQuery } from '../queries/segmentsPageQuery';
import { productsPageQuery } from '../queries/productsPageQuery';
import useContent from '../hooks/useContent';
import './Header.css';

const slugify = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'segment';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [segmentsDropdownOpen, setSegmentsDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [activeProductGroup, setActiveProductGroup] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [segments, setSegments] = useState([]);
  const [products, setProducts] = useState([]);
  const [mobileSegmentsOpen, setMobileSegmentsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState(null);
  const [mobileExpandedProduct, setMobileExpandedProduct] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: productsCms } = useContent(productsPageQuery);

  // Direct scroll handler for dropdown links — bypasses React Router hash timing issues
  const HEADER_OFFSET = 100;
  const handleDropdownClick = useCallback((e, path, slug) => {
    e.preventDefault();
    setSegmentsDropdownOpen(false);
    setProductsDropdownOpen(false);
    setActiveProductGroup(null);
    setActiveProduct(null);
    setIsOpen(false);
    setMobileSegmentsOpen(false);
    setMobileProductsOpen(false);
    setMobileExpandedGroup(null);
    setMobileExpandedProduct(null);

    const scrollToEl = () => {
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(slug);
        if (el) {
          requestAnimationFrame(() => {
            const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
            window.scrollTo({ top, behavior: 'smooth' });
          });
          return;
        }
        if (++attempts < 15) setTimeout(tryScroll, 100);
      };
      setTimeout(tryScroll, 100);
    };

    if (location.pathname === path) {
      // Already on the page — scroll directly
      window.history.replaceState(null, '', `${path}#${slug}`);
      scrollToEl();
    } else {
      // Navigate to the page, then scroll after render
      navigate(`${path}#${slug}`);
      scrollToEl();
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    // Fetch segments for Segments dropdown
    client.fetch(segmentsPageQuery).then((data) => {
      const list = (data?.segments || [])
        .filter((s) => s?.enabled !== false)
        .map((s) => ({
          title: s?.title || '',
          slug: s?.slug ? String(s.slug).trim() || slugify(s?.title) : slugify(s?.title)
        }))
        .filter((s) => s.title && s.slug);
      setSegments(list);
    });
  }, []);

  useEffect(() => {
    // Populate products from CMS with full nested structure
    const list = (productsCms?.productGroups || [])
      .filter((g) => g?.title)
      .map((g) => ({
        title: g?.title || '',
        slug: g?.segmentSlug ? String(g.segmentSlug).trim() || slugify(g?.title) : slugify(g?.title),
        products: (g?.products || [])
          .filter((p) => p?.name)
          .map((p) => ({
            name: p.name,
            items: (p.items || [])
              .filter((it) => it?.title)
              .map((it) => ({
                title: it.title,
                slug: it.slug || slugify(it.title)
              }))
          }))
      }))
      .filter((g) => g.title && g.slug);
    setProducts(list);
  }, [productsCms]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setMobileSegmentsOpen(false);
    setMobileProductsOpen(false);
    setMobileExpandedGroup(null);
    setMobileExpandedProduct(null);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Segments', path: '/divisions', isDropdown: true },
    { name: 'Products', path: '/products', isDropdown: true },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleAdmin = async () => {
    const pwd = window.prompt("Enter Admin Password:");

    if (!pwd) return;

    if (pwd !== process.env.REACT_APP_ADMIN_PASSWORD) {
      alert("Incorrect Password 😐");
      return;
    }

    const choice = window.prompt(
      "Type one option:\n\n1 = CMS\n2 = Analytics"
    );

    if (!choice) return;

    if (choice === "1") {
      const url = process.env.REACT_APP_SANITY_STUDIO_URL;
      if (url) window.location.href = url;
      else alert("CMS URL not configured");
    }

    if (choice === "2") {
      const url = process.env.REACT_APP_ANALYTICS_URL;
      if (url) window.location.href = url;
      else alert("Analytics URL not configured");
    }
  };

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <div className="logo-container">
                <div className="logo-icon">
                  <img 
                    src={process.env.PUBLIC_URL + "/images/logo.png"} 
                    alt="Al Safa Global Logo" 
                    className="logo-image"
                    onLoad={() => console.log('Logo loaded successfully')}
                    onError={(e) => {
                      console.error('Error loading logo:', e);
                      console.error('Attempted URL:', process.env.PUBLIC_URL + "/images/logo.png");
                    }}
                  />
                </div>
                <div className="logo-text-container">
                  <span className="company-name">Al Safa Global</span>
                  <span className="company-tagline">General Trading FZ LLC</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  className={`nav-item ${item.isDropdown ? 'nav-item-dropdown' : ''}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => {
                    if (!item.isDropdown) return;
                    if (item.name === 'Segments') setSegmentsDropdownOpen(true);
                    if (item.name === 'Products') setProductsDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (!item.isDropdown) return;
                    if (item.name === 'Segments') setSegmentsDropdownOpen(false);
                    if (item.name === 'Products') setProductsDropdownOpen(false);
                  }}
                >
                  {item.isDropdown ? (
                    <>
                      <span className={`nav-link nav-link-trigger ${isActive(item.path) ? 'active' : ''}`}>
                        <Link to={item.path} className="nav-link-text">
                          {item.name}
                        </Link>
                        <span
                          className="nav-chevron-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.name === 'Segments') setSegmentsDropdownOpen(prev => !prev);
                            if (item.name === 'Products') setProductsDropdownOpen(prev => !prev);
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`Toggle ${item.name} dropdown`}
                        >
                          <FiChevronDown className={`nav-chevron ${(item.name === 'Segments' ? segmentsDropdownOpen : productsDropdownOpen) ? 'open' : ''}`} />
                        </span>
                      </span>
                      {/* Segments dropdown */}
                      {item.name === 'Segments' && segments.length > 0 && (
                        <AnimatePresence>
                          {segmentsDropdownOpen && (
                            <motion.ul
                              className="nav-dropdown"
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {segments.map((seg) => (
                                <li key={seg.slug}>
                                  <a
                                    href={`${item.path}#${seg.slug}`}
                                    className="nav-dropdown-link"
                                    onClick={(e) => handleDropdownClick(e, item.path, seg.slug)}
                                  >
                                    {seg.title}
                                  </a>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}

                      {/* Products dropdown — nested */}
                      {item.name === 'Products' && products.length > 0 && (
                        <AnimatePresence>
                          {productsDropdownOpen && (
                            <motion.ul
                              className="nav-dropdown nav-dropdown--products"
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {products.map((group, gi) => (
                                <li
                                  key={group.slug}
                                  className="nav-dropdown-group"
                                  onMouseEnter={() => setActiveProductGroup(gi)}
                                  onMouseLeave={() => { setActiveProductGroup(null); setActiveProduct(null); }}
                                >
                                  <a
                                    href={`${item.path}#${group.slug}`}
                                    className="nav-dropdown-link nav-dropdown-link--parent"
                                    onClick={(e) => handleDropdownClick(e, item.path, group.slug)}
                                  >
                                    {group.title}
                                    {group.products.length > 0 && <FiChevronDown className="nav-nested-chevron" />}
                                  </a>
                                  {/* Nested: products within group */}
                                  {activeProductGroup === gi && group.products.length > 0 && (
                                    <ul className="nav-subdropdown">
                                      {group.products.map((prod, pi) => (
                                        <li
                                          key={pi}
                                          className="nav-subdropdown-item"
                                          onMouseEnter={() => setActiveProduct(pi)}
                                          onMouseLeave={() => setActiveProduct(null)}
                                        >
                                          <span className="nav-subdropdown-link">
                                            {prod.name}
                                            {prod.items.length > 0 && <FiChevronDown className="nav-nested-chevron" />}
                                          </span>
                                          {/* Nested: items within product */}
                                          {activeProduct === pi && prod.items.length > 0 && (
                                            <ul className="nav-subdropdown nav-subdropdown--items">
                                              {prod.items.map((it) => (
                                                <li key={it.slug}>
                                                  <Link
                                                    to={`/products/item/${it.slug}`}
                                                    className="nav-subdropdown-link"
                                                    onClick={() => {
                                                      setProductsDropdownOpen(false);
                                                      setActiveProductGroup(null);
                                                      setActiveProduct(null);
                                                    }}
                                                  >
                                                    {it.title}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.li>
              ))}
              <motion.li 
                className="nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <button className="nav-link" onClick={handleAdmin}>
                  Admin
                </button>
              </motion.li>
            </ul>
          </nav>

          {/* CTA Button */}
          <motion.div 
            className="header-cta"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/quote" className="btn btn-primary">
              Get Quote
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="nav-mobile">
                <ul className="mobile-nav-list">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      className="mobile-nav-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.isDropdown && item.name === 'Segments' && segments.length > 0 ? (
                        <div className="mobile-nav-segments">
                          <div className="mobile-nav-dropdown-header">
                            <Link
                              to={item.path}
                              className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                            <span
                              className="mobile-chevron-btn"
                              onClick={() => setMobileSegmentsOpen(prev => !prev)}
                              role="button"
                              tabIndex={0}
                              aria-label="Toggle Segments submenu"
                            >
                              <FiChevronDown className={`nav-chevron ${mobileSegmentsOpen ? 'open' : ''}`} />
                            </span>
                          </div>
                          {mobileSegmentsOpen && (
                            <ul className="mobile-nav-sublist">
                              {segments.map((seg) => (
                                <li key={seg.slug}>
                                  <a
                                    href={`${item.path}#${seg.slug}`}
                                    className="mobile-nav-sublink"
                                    onClick={(e) => handleDropdownClick(e, item.path, seg.slug)}
                                  >
                                    {seg.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : item.isDropdown && item.name === 'Products' && products.length > 0 ? (
                        <div className="mobile-nav-segments">
                          <div className="mobile-nav-dropdown-header">
                            <Link
                              to={item.path}
                              className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                            <span
                              className="mobile-chevron-btn"
                              onClick={() => setMobileProductsOpen(prev => !prev)}
                              role="button"
                              tabIndex={0}
                              aria-label="Toggle Products submenu"
                            >
                              <FiChevronDown className={`nav-chevron ${mobileProductsOpen ? 'open' : ''}`} />
                            </span>
                          </div>
                          {mobileProductsOpen && (
                            <ul className="mobile-nav-sublist">
                              {products.map((group, gi) => (
                                <li key={group.slug}>
                                  <div className="mobile-nav-dropdown-header">
                                    <a
                                      href={`${item.path}#${group.slug}`}
                                      className="mobile-nav-sublink"
                                      onClick={(e) => handleDropdownClick(e, item.path, group.slug)}
                                    >
                                      {group.title}
                                    </a>
                                    {group.products.length > 0 && (
                                      <span
                                        className="mobile-chevron-btn mobile-chevron-btn--small"
                                        onClick={() => setMobileExpandedGroup(mobileExpandedGroup === gi ? null : gi)}
                                        role="button"
                                        tabIndex={0}
                                      >
                                        <FiChevronDown className={`nav-chevron ${mobileExpandedGroup === gi ? 'open' : ''}`} />
                                      </span>
                                    )}
                                  </div>
                                  {mobileExpandedGroup === gi && group.products.length > 0 && (
                                    <ul className="mobile-nav-sublist">
                                      {group.products.map((prod, pi) => (
                                        <li key={pi}>
                                          <div className="mobile-nav-dropdown-header">
                                            <span className="mobile-nav-sublink mobile-nav-sublink--product">{prod.name}</span>
                                            {prod.items.length > 0 && (
                                              <span
                                                className="mobile-chevron-btn mobile-chevron-btn--small"
                                                onClick={() => setMobileExpandedProduct(mobileExpandedProduct === `${gi}-${pi}` ? null : `${gi}-${pi}`)}
                                                role="button"
                                                tabIndex={0}
                                              >
                                                <FiChevronDown className={`nav-chevron ${mobileExpandedProduct === `${gi}-${pi}` ? 'open' : ''}`} />
                                              </span>
                                            )}
                                          </div>
                                          {mobileExpandedProduct === `${gi}-${pi}` && prod.items.length > 0 && (
                                            <ul className="mobile-nav-sublist">
                                              {prod.items.map((it) => (
                                                <li key={it.slug}>
                                                  <Link
                                                    to={`/products/item/${it.slug}`}
                                                    className="mobile-nav-sublink"
                                                    onClick={() => setIsOpen(false)}
                                                  >
                                                    {it.title}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                  <motion.li 
                    className="mobile-nav-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <button className="mobile-nav-link" onClick={handleAdmin}>
                      Admin
                    </button>
                  </motion.li>
                </ul>
                <motion.div 
                  className="mobile-cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link to="/quote" className="btn btn-primary btn-large">
                    Get Quote
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header; 