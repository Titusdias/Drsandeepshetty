import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'branch',
  title: 'Branch',
  type: 'document',
  // List view: add { sortable: true } on the `order` field for drag-and-drop sorting
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Mangaluru Flagship"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Display label e.g. "Flagship clinic"',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Branch-specific phone number',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      description: 'Link to this branch on Google Maps',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Hide from the website when unchecked',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'For sorting branches',
    }),
  ],
})
