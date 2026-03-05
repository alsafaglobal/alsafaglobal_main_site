export default {
  name: 'segmentsPage',
  title: 'Segments Page',
  type: 'document',

  fields: [

    // PAGE HEADER
    {
      name: 'title',
      title: 'Page Title',
      type: 'string'
    },

    {
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'array',
      of: [{ type: 'block' }]
    },

    // SEGMENTS LIST (all data inline — no separate segment documents needed)
    {
      name: 'segments',
      title: 'Business Segments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Show This Segment',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'title',
              title: 'Segment Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'slug',
              title: 'URL Slug',
              type: 'string',
              description: 'Lowercase, hyphens only (e.g. office-construction). Used for navigation links.',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Short Description',
              type: 'text'
            },
            {
              name: 'image',
              title: 'Segment Image',
              type: 'image',
              options: { hotspot: true },
              description: 'An image representing this segment (displayed on the Divisions page).'
            },
            {
              name: 'servicesTitle',
              title: 'Services Section Heading',
              type: 'string',
              initialValue: 'Our Products & Services Include:'
            },
            {
              name: 'services',
              title: 'Services List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'text', title: 'Service Item', type: 'string' },
                    { name: 'enabled', title: 'Show This Item', type: 'boolean', initialValue: true }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: { title: 'title', enabled: 'enabled' },
            prepare({ title, enabled }) {
              return { title: title || 'Untitled Segment', subtitle: enabled === false ? 'Hidden' : 'Visible' }
            }
          }
        }
      ]
    },

    // WHY CHOOSE US
    {
      name: 'whyChoose',
      title: 'Why Choose Us Section',
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
  