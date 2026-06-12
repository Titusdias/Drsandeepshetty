import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  // List view: add { sortable: true } on the `order` field for drag-and-drop sorting
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the team member',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path segment for /team/[slug]',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. "Lead clinician · orthodontics & multi-specialty dentistry"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Professional biography shown on the team page',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Headshot or portrait photo',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order on the Team page (lower numbers appear first)',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Hide from the website when unchecked',
      initialValue: true,
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      description: 'Areas of clinical expertise',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      description: 'Degrees, certifications, and credentials',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
