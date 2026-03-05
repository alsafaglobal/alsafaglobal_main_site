import React from 'react';

/**
 * Standardized BrandText component for "Al Safa Global" styling
 * Supports only two states: gold highlight or default (currentColor)
 * Controlled via CMS brandColor field
 */
const BrandText = ({ 
  brandText = 'Al Safa Global', 
  brandColor = 'default',
  className = '',
  ...props 
}) => {
  return (
    <span
      style={{
        color: brandColor === 'gold'
          ? '#f59e0b'
          : 'currentColor',
      }}
      data-cms-key="hero.brandText"
      data-cms-field="brandColor"
      className={className}
      {...props}
    >
      {brandText}
    </span>
  );
};

/**
 * Utility function to replace "Al Safa Global" in text with standardized HTML span
 * For use with dangerouslySetInnerHTML
 */
export const highlightBrand = (text, brandText = 'Al Safa Global', brandColor = 'default') => {
  if (!text) return '';
  const color = brandColor === 'gold' ? '#f59e0b' : 'currentColor';
  return text.replace(
    new RegExp(brandText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
    `<span style="color: ${color};" data-cms-key="hero.brandText" data-cms-field="brandColor">${brandText}</span>`
  );
};

export default BrandText;
