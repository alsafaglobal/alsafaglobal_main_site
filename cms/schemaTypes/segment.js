export default {
  name: 'segment',
  title: 'Segment',
  type: 'document',

  fields: [
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
      description: 'Used in nav dropdown and section anchor (e.g. office-construction). Lowercase, hyphens only. Falls back to title if empty.',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text'
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
  ]
}
