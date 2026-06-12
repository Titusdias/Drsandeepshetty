import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  // Desk structure should use S.documentTypeListItem('aboutPage').id('aboutPage') for this singleton
  fieldsets: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'philosophy', title: 'Philosophy Section' },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    defineField({
      name: 'hero_sectionLabel',
      title: 'Section Label',
      type: 'string',
      description: 'e.g. "About us"',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_heading',
      title: 'Heading',
      type: 'string',
      description: 'Main headline for the About page hero',
      validation: Rule => Rule.required(),
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_body',
      title: 'Body',
      type: 'text',
      description: 'Introductory paragraph below the heading',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_ctaPrimary_label',
      title: 'Primary CTA Label',
      type: 'string',
      description: 'Text for the main call-to-action button',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_ctaPrimary_url',
      title: 'Primary CTA URL',
      type: 'string',
      description: 'Link for the main call-to-action button',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_ctaSecondary_label',
      title: 'Secondary CTA Label',
      type: 'string',
      description: 'Text for the secondary call-to-action button',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_ctaSecondary_url',
      title: 'Secondary CTA URL',
      type: 'string',
      description: 'Link for the secondary call-to-action button',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_videoFile',
      title: 'Hero Video',
      type: 'file',
      description: 'MP4 video shown in the About page hero',
      options: { accept: 'video/mp4' },
      fieldset: 'hero',
    }),
    defineField({
      name: 'philosophy_heading',
      title: 'Philosophy Heading',
      type: 'string',
      description: 'e.g. "Our philosophy"',
      fieldset: 'philosophy',
    }),
    defineField({
      name: 'philosophy_body',
      title: 'Philosophy Body',
      type: 'text',
      description: 'Overview of the clinic\'s care philosophy',
      fieldset: 'philosophy',
    }),
    defineField({
      name: 'philosophy_pillars',
      title: 'Philosophy Pillars',
      type: 'array',
      description: 'Key values or pillars that define the clinic\'s approach',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Short pillar heading',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Brief explanation of this pillar',
            }),
          ],
        }),
      ],
      fieldset: 'philosophy',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'pageSeo',
      description: 'Page-specific SEO overrides',
      fieldset: 'seo',
    }),
  ],
})
