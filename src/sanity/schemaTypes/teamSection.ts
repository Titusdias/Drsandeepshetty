import { defineField, defineType, defineArrayMember } from 'sanity'

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Team',
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'member',
          title: 'Member',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'designation',
              title: 'Designation / Role',
              type: 'string',
            }),
            defineField({
              name: 'profilePicture',
              title: 'Profile Picture',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
  ],
})
