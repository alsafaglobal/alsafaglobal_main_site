import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Divisions from './pages/Divisions';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Products from './pages/Products';
import ItemDetail from './pages/ItemDetail';
import BrandDetail from './pages/BrandDetail';
import './App.css';

function App() {
  return (
    <>
      <Helmet>
        <title>Al Safa Global - Procurement & Supply Chain Solutions</title>
        <meta name="description" content="Al Safa Global General Trading FZ LLC - Your Trusted Partner in Procurement & Supply Chain Solutions. We provide comprehensive procurement, supply chain management, and trading services across the UAE and Middle East." />
        <meta name="keywords" content="procurement, supply chain, trading, UAE, Dubai, Al Safa Global, business solutions, logistics" />
        <meta name="author" content="Al Safa Global General Trading FZ LLC" />
        <link rel="canonical" href="https://al-safa-global.vercel.app/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Al Safa Global - Procurement & Supply Chain Solutions" />
        <meta property="og:description" content="Your Trusted Partner in Procurement & Supply Chain Solutions. We provide comprehensive procurement, supply chain management, and trading services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://al-safa-global.vercel.app/" />
        <meta property="og:image" content="https://al-safa-global.vercel.app/images/logo.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Al Safa Global - Procurement & Supply Chain Solutions" />
        <meta name="twitter:description" content="Your Trusted Partner in Procurement & Supply Chain Solutions. We provide comprehensive procurement, supply chain management, and trading services." />
        <meta name="twitter:image" content="https://al-safa-global.vercel.app/images/logo.png" />
      </Helmet>
      
      <ScrollToTop />
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/divisions" element={<Divisions />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/item/:slug" element={<ItemDetail />} />
            <Route path="/products/item/:slug/brand/:brandIndex" element={<BrandDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App; 