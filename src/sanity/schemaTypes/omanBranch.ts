import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'omanBranch',
  title: 'Oman Branch',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Branch name e.g. "Muscat Clinic"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      description: 'Full street address for the Oman location',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Contact phone number for the Oman branch',
    }),
  ],
})
