import { defineField, defineType, defineArrayMember } from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'phoneNumbers',
      title: 'Phone Numbers',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Clinic Address',
      type: 'text',
    }),
    defineField({
      name: 'mapEmbedLink',
      title: 'Map Embed Link or Coordinates',
      type: 'url',
    }),
    defineField({
      name: 'timings',
      title: 'Clinic Timings',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'timing',
          title: 'Timing Slot',
          type: 'object',
          fields: [
            defineField({
              name: 'days',
              title: 'Days (e.g., Mon - Fri)',
              type: 'string',
            }),
            defineField({
              name: 'hours',
              title: 'Hours (e.g., 9:00 AM - 5:00 PM)',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
