import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'navigationMenu',
  title: 'Navigation Menu',
  type: 'document',
  // Desk structure should use S.documentTypeListItem('navigationMenu').id('navigationMenu') for this singleton
  fields: [
    defineField({
      name: 'items',
      title: 'Nav Items',
      type: 'array',
      description: 'Main navigation links — reorder to change menu order',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Text shown in the navigation',
            }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'string',
              description: 'Link path e.g. "/services" or full URL for external links',
            }),
            defineField({
              name: 'isExternal',
              title: 'Is External',
              type: 'boolean',
              description: 'Opens in a new tab when checked',
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Sort order (lower numbers appear first)',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'e.g. "Book appointment"',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'string',
      description: 'Link for the header call-to-action button',
    }),
  ],
})
