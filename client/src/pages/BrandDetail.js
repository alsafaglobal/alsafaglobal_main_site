import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { client } from '../sanityClient';
import { allItemsRawQuery } from '../queries/productsPageQuery';
import './BrandDetail.css';

const slugify = (s) =>
  (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';

const BrandDetail = () => {
  const { slug, brandIndex } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(allItemsRawQuery)
      .then((data) => {
        const items = data?.items || [];
        const foundItem = items.find(it => {
          const itSlug = it.slug || slugify(it.title);
          return itSlug === slug;
        }) || null;
        const idx = parseInt(brandIndex, 10);
        const b = foundItem?.brands?.[idx] || null;
        setBrand(b);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, brandIndex]);

  if (loading) {
    return (
      <div className="brand-detail-page">
        <div className="container brand-detail-loading">Loading…</div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="brand-detail-page">
        <div className="container brand-detail-empty">
          <h2>Brand not found</h2>
          <Link to={`/products/item/${slug}`} className="brand-back-link">&larr; Back to Brands</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-detail-page">
      <section className="brand-detail-hero">
        <div className="container">
          <Link to={`/products/item/${slug}`} className="brand-back-link">&larr; Back to Brands</Link>

          <motion.div
            className="brand-detail-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {brand.showBrandImage !== false && brand.brandImageUrl && (
              <div className="brand-detail-image">
                <img src={brand.brandImageUrl} alt={brand.brandName || 'Brand'} />
              </div>
            )}

            <div className="brand-detail-info">
              {brand.showBrandName !== false && brand.brandName && (
                <h1 className="brand-detail-name">{brand.brandName}</h1>
              )}
              {brand.showModelName !== false && brand.modelName && (
                <p className="brand-detail-model">{brand.modelName}</p>
              )}
              {brand.showSpecification !== false && brand.specification && (
                <div className="brand-detail-spec">
                  <h3>Specification</h3>
                  <p>{brand.specification}</p>
                </div>
              )}
              {brand.showPrice !== false && brand.price && (
                <div className="brand-detail-price">
                  <span>{brand.price}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BrandDetail;
