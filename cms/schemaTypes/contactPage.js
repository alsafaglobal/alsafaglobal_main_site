export default {
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
  
    fields: [
  
      //
      // PAGE HEADER
      //
      {
        name: 'title',
        title: 'Page Title',
        type: 'string'
      },
  
      {
        name: 'intro',
        title: 'Intro Text',
        type: 'array',
        of: [{ type: 'block' }]
      },
  
  
  
      //
      // GET IN TOUCH SECTION
      //
      {
        name: 'getInTouch',
        title: 'Get In Touch Section',
        type: 'object',
  
        fields: [
  
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
  
          {
            name: 'description',
            title: 'Section Description',
            type: 'array',
            of: [{ type: 'block' }]
          }
        ]
      },
  
  
  
      //
      // CONTACT DETAILS
      //
      {
        name: 'contactDetails',
        title: 'Contact Details',
        type: 'object',
  
        fields: [
  
          {
            name: 'email',
            title: 'Email Address',
            type: 'string'
          },
  
          {
            name: 'emailNote',
            title: 'Email Note',
            type: 'string'
          },
  
          {
            name: 'phone',
            title: 'Phone Number',
            type: 'string'
          },
  
          {
            name: 'phoneNote',
            title: 'Phone Note',
            type: 'string'
          },
  
          {
            name: 'addressTitle',
            title: 'Address Heading',
            type: 'string'
          },
  
          {
            name: 'address',
            title: 'Full Address',
            type: 'array',
            of: [{ type: 'block' }]
          },
  
          {
            name: 'serviceAreas',
            title: 'Service Areas Description',
            type: 'array',
            of: [{ type: 'block' }]
          },
  
          {
            name: 'businessHours',
            title: 'Business Hours',
            type: 'array',
            of: [{ type: 'block' }]
          }
        ]
      },
  
  
  
      //
      // PARTNERSHIP SECTION
      //
      {
        name: 'partnership',
        title: 'Partnership Opportunities Section',
        type: 'object',
  
        fields: [
  
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
  
          {
            name: 'description',
            title: 'Section Description',
            type: 'array',
            of: [{ type: 'block' }]
          }
        ]
      },
  
  
  
      //
      // FORM INFO (TEXT ONLY — FORM STILL IN REACT)
      //
      {
        name: 'formContent',
        title: 'Contact Form Text',
        type: 'object',
  
        fields: [
  
          {
            name: 'title',
            title: 'Form Title',
            type: 'string'
          },
  
          {
            name: 'description',
            title: 'Form Description',
            type: 'array',
            of: [{ type: 'block' }]
          }
        ]
      },
  
  
  
      //
      // WHY CHOOSE US
      //
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
            name: 'items',
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
          }
        ]
      }
  
    ]
  }
  