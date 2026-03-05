import { SegmentSelector } from '../components/SegmentSelector'

export default {
  name: 'productsPage',
  title: 'Products Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'productGroups',
      title: 'Product Groups',
      description: 'Each group is a big heading with multiple products.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Group Title',
              type: 'string',
            },
            {
              name: 'products',
              title: 'Products',
              description: 'Products in this group (e.g. Desktop computers, Laptops). Each product can have its own list of items.',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Product Name', type: 'string' },
                    { name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } },
                    { name: 'description', title: 'Product Description', type: 'text' },
                    {
                      name: 'items',
                      title: 'Items',
                      description: 'Items under this product. Each has image, title, description, and brands.',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            { name: 'title', title: 'Item Title', type: 'string' },
                            {
                              name: 'slug',
                              title: 'URL Slug',
                              type: 'slug',
                              description: 'URL-friendly identifier. Click Generate.',
                              options: { source: 'title', maxLength: 96 },
                            },
                            { name: 'image', title: 'Item Image', type: 'image', options: { hotspot: true } },
                            { name: 'description', title: 'Item Description', type: 'text' },
                            {
                              name: 'brands',
                              title: 'Brands / Models',
                              description: 'Different brands and models for this item.',
                              type: 'array',
                              of: [
                                {
                                  type: 'object',
                                  fields: [
                                    { name: 'brandImage', title: 'Brand Image', type: 'image', options: { hotspot: true } },
                                    { name: 'showBrandImage', title: 'Show Brand Image', type: 'boolean', initialValue: true },
                                    { name: 'brandName', title: 'Brand Name', type: 'string' },
                                    { name: 'showBrandName', title: 'Show Brand Name', type: 'boolean', initialValue: true },
                                    { name: 'modelName', title: 'Model Name', type: 'string' },
                                    { name: 'showModelName', title: 'Show Model Name', type: 'boolean', initialValue: true },
                                    { name: 'specification', title: 'Specification', type: 'text' },
                                    { name: 'showSpecification', title: 'Show Specification', type: 'boolean', initialValue: true },
                                    { name: 'price', title: 'Price', type: 'string' },
                                    { name: 'showPrice', title: 'Show Price', type: 'boolean', initialValue: true },
                                  ],
                                  preview: {
                                    select: { title: 'brandName', subtitle: 'modelName', media: 'brandImage' },
                                  },
                                },
                              ],
                            },
                          ],
                          preview: {
                            select: { title: 'title', media: 'image' },
                          },
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: { title: 'name', media: 'image' },
                  },
                },
              ],
            },
            {
              name: 'segmentSlug',
              title: 'Link to Segment',
              type: 'string',
              description: 'Select the segment this group\'s "View Services" button links to.',
              components: { input: SegmentSelector },
            },
          ],
        },
      ],
    },
  ],
}
