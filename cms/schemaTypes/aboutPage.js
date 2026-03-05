export default {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
  
    fields: [
  
      // PAGE HERO TITLE
      {
        name: 'pageTitle',
        title: 'Page Title',
        type: 'string'
      },
  
      // INTRO / OVERVIEW TEXT
      {
        name: 'introText',
        title: 'Introduction Text',
        type: 'array',
        of: [{ type: 'block' }]
      },
  
      // VISION BLOCK
      {
        name: 'vision',
        title: 'Our Vision',
        type: 'object',
  
        fields: [
          {
            name: 'title',
            title: 'Vision Title',
            type: 'string'
          },
          {
            name: 'text',
            title: 'Vision Description',
            type: 'array',
            of: [{ type: 'block' }]
          }
        ]
      },
  
      // MISSION BLOCK
      {
        name: 'mission',
        title: 'Our Mission',
        type: 'object',
  
        fields: [
          {
            name: 'title',
            title: 'Mission Title',
            type: 'string'
          },
          {
            name: 'text',
            title: 'Mission Description',
            type: 'array',
            of: [{ type: 'block' }]
          }
        ]
      },
      {
        name: 'coreValues',
        title: 'Our Core Values',
        type: 'object',
      
        fields: [
      
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
      
          {
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text'
          },
      
          {
            name: 'values',
            title: 'Core Values List',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'title', title: 'Value Title', type: 'string' },
                  { name: 'description', title: 'Value Description', type: 'text' },
                  { name: 'enabled', title: 'Show This Value', type: 'boolean', initialValue: true }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'whyChoose',
        title: 'Why Choose Us',
        type: 'object',
      
        fields: [
      
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
      
          {
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text'
          },
      
          {
            name: 'features',
            title: 'Reasons List',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'title', title: 'Reason Title', type: 'string' },
                  { name: 'description', title: 'Reason Description', type: 'text' },
                  { name: 'enabled', title: 'Show This Item', type: 'boolean', initialValue: true }
                ]
              }
            ]
          },
          {
            name: 'services',
            title: 'Procurement & Supply Services',
            type: 'object',
          
            fields: [
          
              // SECTION 1 — CORE SERVICES
              {
                name: 'coreServices',
                title: 'Core Procurement & Supply Chain Services',
                type: 'object',
          
                fields: [
          
                  { name: 'title', title: 'Section Title', type: 'string' },
          
                  { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
          
                  {
                    name: 'items',
                    title: 'Service List',
                    type: 'array',
                    of: [
                      {
                        type: 'object',
                        fields: [
                          { name: 'title', title: 'Service Title', type: 'string' },
                          { name: 'enabled', title: 'Show This Item', type: 'boolean', initialValue: true }
                        ]
                      }
                    ]
                  }
                ]
              },
          
          
          
              // SECTION 2 — SECTOR SPECIFIC
              {
                name: 'sectorServices',
                title: 'Sector-Specific Supply Solutions',
                type: 'object',
          
                fields: [
          
                  { name: 'title', title: 'Section Title', type: 'string' },
          
                  { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
          
                  {
                    name: 'items',
                    title: 'Sector Services',
                    type: 'array',
                    of: [
                      {
                        type: 'object',
                        fields: [
                          { name: 'title', title: 'Service Title', type: 'string' },
                          { name: 'enabled', title: 'Show This Item', type: 'boolean', initialValue: true }
                        ]
                      }
                    ]
                  }
                ]
              },
          
          
          
              // SECTION 3 — VALUE ADDED
              {
                name: 'valueAdded',
                title: 'Value-Added Services',
                type: 'object',
          
                fields: [
          
                  { name: 'title', title: 'Section Title', type: 'string' },
          
                  { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
          
                  {
                    name: 'items',
                    title: 'Extra Services',
                    type: 'array',
                    of: [
                      {
                        type: 'object',
                        fields: [
                          { name: 'title', title: 'Service Title', type: 'string' },
                          { name: 'enabled', title: 'Show This Item', type: 'boolean', initialValue: true }
                        ]
                      }
                    ]
                  }
                ]
              }
          
            ]
          }
          
        ]
      },
      {
        name: 'brandPartners',
        title: 'Trusted Brand Partners',
        type: 'object',
      
        fields: [
      
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
      
          {
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text'
          },
      
          {
            name: 'logos',
            title: 'Brand Logos',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
      
                  {
                    name: 'image',
                    title: 'Logo Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                      {
                        name: 'alt',
                        title: 'Alt Text (SEO)',
                        type: 'string'
                      }
                    ]
                  },
      
                  {
                    name: 'enabled',
                    title: 'Show This Logo',
                    type: 'boolean',
                    initialValue: true
                  }
      
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'contactSection',
        title: 'Get In Touch Section',
        type: 'object',
      
        fields: [
      
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
      
          {
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text'
          },
      
          {
            name: 'email',
            title: 'Contact Email',
            type: 'string'
          },
      
          {
            name: 'address',
            title: 'Company Address',
            type: 'array',
            of: [{ type: 'block' }]
          },
      
          {
            name: 'phone',
            title: 'Contact Number',
            type: 'string'
          },
      
          {
            name: 'stats',
            title: 'Stats Section',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'number', title: 'Number', type: 'string' },
                  { name: 'label', title: 'Label', type: 'string' },
                  { name: 'enabled', title: 'Show This Stat', type: 'boolean', initialValue: true }
                ]
              }
            ]
          }
        ]
      }
      
      
      
      
      
      
    ]
  }
  