import { defineType, defineField, defineArrayMember } from 'sanity'

export const features = defineType({
  name: 'features',
  title: 'Features Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Feature Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'featureItem',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        }),
      ],
    }),
  ],
})
