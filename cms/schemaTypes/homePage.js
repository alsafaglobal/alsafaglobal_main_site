export default {
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
  
    fields: [
        {
            name: 'bannerImage',
            title: 'Hero Banner Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
              { name: 'alt', title: 'Alt text', type: 'string' }
            ]
          },
          
      { name: 'heroTitle', title: 'Hero Title', type: 'string' },
      { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' },
      {
        name: 'brandText',
        title: 'Brand Text',
        type: 'string',
        description: 'The text to display in the hero heading (e.g., "Al Safa Global")',
        initialValue: 'Al Safa Global'
      },
      {
        name: 'brandColor',
        title: 'Brand Text Color',
        type: 'string',
        options: {
          list: [
            { title: 'Default (Match Heading)', value: 'default' },
            { title: 'Gold', value: 'gold' }
          ],
          layout: 'radio'
        },
        initialValue: 'default'
      },
      { name: 'introText', title: 'Intro Paragraph', type: 'array', of: [{ type: 'block' }] },

      {
        name: 'heroSideImage',
        title: 'Hero Right-Side Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt text', type: 'string' }
        ]
      },
      
  
      {
        name: 'stats',
        title: 'Stats Section',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'number', type: 'string', title: 'Number (e.g. 500+)' },
              { name: 'label', type: 'string', title: 'Label (e.g. Satisfied Clients)' }
            ]
          }
        ]
      },

      {
        name: 'homeEvents',
        title: 'Event Banners',
        type: 'array',
        description: 'Rotating event banners displayed below the hero. Only enabled events are shown.',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'enabled', title: 'Show this event', type: 'boolean', initialValue: true },
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'subtitle', title: 'Subtitle', type: 'text' },
              { name: 'ctaLabel', title: 'Button Label', type: 'string' },
              { name: 'ctaLink', title: 'Button Link', type: 'string' },
              {
                name: 'background',
                title: 'Background Image',
                type: 'image',
                options: { hotspot: true },
                fields: [
                  { name: 'alt', title: 'Alt text', type: 'string' }
                ]
              }
            ],
            preview: {
              select: { title: 'title' },
              prepare: ({ title }) => ({ title: title || 'Event Banner' })
            }
          }
        ]
      },
  
      {
        name: 'aboutPreview',
        title: 'About Section (Homepage)',
        type: 'object',
      
        fields: [
      
          // Title
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
      
          // Main Content Paragraphs
          {
            name: 'body',
            title: 'Main About Text',
            type: 'array',
            of: [{ type: 'block' }]
          },
          {
            name: 'image',
            title: 'About Section Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
              { name: 'alt', title: 'Alt text', type: 'string' }
            ]
          },
          
      
          // Highlight Cards
          {
            name: 'highlights',
            title: 'Highlight Cards',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'title', title: 'Card Title', type: 'string' },
                  { name: 'enabled', title: 'Show this card', type: 'boolean', initialValue: true }
                ]
              }
            ]
          },
      
          // Keyword Tags
          {
            name: 'tags',
            title: 'Keyword Tags',
            type: 'array',
            of: [{ type: 'string' }]
          },
      
          // CTA Button Text ONLY
          {
            name: 'buttonLabel',
            title: 'Button Text',
            type: 'string'
          }
        ]
      },

      {
        name: 'segmentsPreview',
        title: 'Segments Section (Homepage)',
        type: 'object',
      
        fields: [
      
          // Section Title
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
      
          // Subtitle
          {
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text'
          },
      
          // Cards
          {
            name: 'segments',
            title: 'Segment Cards',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
      
                  { name: 'icon', title: 'Icon / Emoji', type: 'string' },
      
                  { name: 'title', title: 'Segment Title', type: 'string' },
      
                  { name: 'description', title: 'Description', type: 'text' },
      
                  { name: 'buttonLabel', title: 'Button Text', type: 'string' },
      
                  { name: 'buttonLink', title: 'Button Link', type: 'string' },
      
                  { name: 'enabled', title: 'Show this card', type: 'boolean', initialValue: true }
                ]
              }
            ]
          }
        ]
      },

      {
        name: 'whyChoose',
        title: 'Why Choose Us Section',
        type: 'object',
      
        fields: [
      
          // Section Title
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
      
          // Subtitle
          {
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text'
          },
      
          // Feature Cards
          {
            name: 'features',
            title: 'Why Choose Us – Features',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
      
                  { name: 'title', title: 'Feature Title', type: 'string' },
      
                  { name: 'description', title: 'Feature Description', type: 'text' },
      
                  { name: 'enabled', title: 'Show this feature', type: 'boolean', initialValue: true }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'ctaSection',
        title: 'Call To Action Section',
        type: 'object',
      
        fields: [
      
          // Title
          {
            name: 'title',
            title: 'CTA Title',
            type: 'string'
          },
      
          // Subtitle
          {
            name: 'subtitle',
            title: 'CTA Subtitle',
            type: 'text'
          },
      
          // Primary Button Text
          {
            name: 'primaryButton',
            title: 'Primary Button Text',
            type: 'string'
          },
      
          // Secondary Button Text
          {
            name: 'secondaryButton',
            title: 'Secondary Button Text',
            type: 'string'
          },
      
          // Stats Below Buttons
          {
            name: 'stats',
            title: 'CTA Stats',
            type: 'array',
            of: [
              {
                name: 'ctaStat',
                title: 'CTA Stat Item',
                type: 'object',
                fields: [
                  {
                    name: 'number',
                    title: 'Number (e.g. 500+)',
                    type: 'string'
                  },
                  {
                    name: 'label',
                    title: 'Label (e.g. Satisfied Clients)',
                    type: 'string'
                  },
                  {
                    name: 'enabled',
                    title: 'Show this stat',
                    type: 'boolean',
                    initialValue: true
                  }
                ],
                preview: {
                  select: { title: 'number', subtitle: 'label' }
                }
              }
            ]
          }
        ]
      },
      {
        name: 'testimonials',
        title: 'Testimonials Section',
        type: 'object',
      
        fields: [
      
          // Section Title
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
      
          // Section Subtitle
          {
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text'
          },
      
          // Testimonials List
          {
            name: 'items',
            title: 'Client Testimonials',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
      
                  // Quote text
                  { 
                    name: 'quote', 
                    title: 'Client Quote', 
                    type: 'text' 
                  },
      
                  // Client name
                  { 
                    name: 'name', 
                    title: 'Client Name', 
                    type: 'string' 
                  },
      
                  // Role / Company
                  { 
                    name: 'designation', 
                    title: 'Designation / Company', 
                    type: 'string' 
                  },
      
                  // Show / hide
                  { 
                    name: 'enabled', 
                    title: 'Show this testimonial', 
                    type: 'boolean', 
                    initialValue: true 
                  }
                ]
              }
            ]
          }
        ]
      }
      
      
      

      
      
      
      
    ]
  }
  
  
  