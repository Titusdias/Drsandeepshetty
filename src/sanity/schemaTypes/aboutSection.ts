import { defineField, defineType } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Bio / Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Doctor / Clinic Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
