import { defineField, defineType, defineArrayMember } from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Gallery',
    }),
    defineField({
      name: 'images',
      title: 'Clinic / Treatment Images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for SEO and accessibility.',
            }),
          ],
        }),
      ],
    }),
  ],
})
