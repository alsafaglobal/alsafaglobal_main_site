import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to handle hash-based smooth scrolling in React Router v6
 * Scrolls to element with matching ID when hash changes
 * 
 * Usage: just call useHashScroll() in any page component
 */
export default function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (!hash) return;

    const HEADER_OFFSET = 100;
    const scrollToElement = () => {
      const el = document.getElementById(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    // Use a longer delay (300ms) and requestAnimationFrame for better reliability
    // 300ms allows time for:
    // - React to render the component tree
    // - Framer Motion to set up animations
    // - DOM layout to complete
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(scrollToElement);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);
}
