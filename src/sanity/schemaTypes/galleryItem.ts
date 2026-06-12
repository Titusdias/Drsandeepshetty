import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  // List view: add { sortable: true } on the `order` field for drag-and-drop sorting
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional caption or internal label',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Gallery image',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessible description of the image for screen readers',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Gallery filter category',
      options: {
        list: [
          { title: 'Before & After', value: 'before-after' },
          { title: 'Clinic', value: 'clinic' },
          { title: 'Team', value: 'team' },
          { title: 'Procedures', value: 'procedures' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order in the gallery (lower numbers appear first)',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Hide from the website when unchecked',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
