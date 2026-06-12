import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamPage',
  title: 'Team Page',
  type: 'document',
  // Desk structure should use S.documentTypeListItem('teamPage').id('teamPage') for this singleton
  fieldsets: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'joinSection', title: 'Join Our Team' },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    defineField({
      name: 'hero_sectionLabel',
      title: 'Section Label',
      type: 'string',
      description: 'e.g. "Our team"',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_heading',
      title: 'Heading',
      type: 'string',
      description: 'Main headline for the Team page',
      validation: Rule => Rule.required(),
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_subheading',
      title: 'Subheading',
      type: 'text',
      description: 'Supporting text below the hero heading',
      fieldset: 'hero',
    }),
    defineField({
      name: 'joinSection_heading',
      title: 'Join Section Heading',
      type: 'string',
      description: 'e.g. "Join Our Team"',
      fieldset: 'joinSection',
    }),
    defineField({
      name: 'joinSection_body',
      title: 'Join Section Body',
      type: 'text',
      description: 'Recruitment or careers copy',
      fieldset: 'joinSection',
    }),
    defineField({
      name: 'joinSection_ctaPrimary_label',
      title: 'Primary CTA Label',
      type: 'string',
      description: 'Text for the main careers call-to-action',
      fieldset: 'joinSection',
    }),
    defineField({
      name: 'joinSection_ctaPrimary_url',
      title: 'Primary CTA URL',
      type: 'string',
      description: 'Link for the main careers call-to-action',
      fieldset: 'joinSection',
    }),
    defineField({
      name: 'joinSection_ctaSecondary_label',
      title: 'Secondary CTA Label',
      type: 'string',
      description: 'Text for the secondary careers call-to-action',
      fieldset: 'joinSection',
    }),
    defineField({
      name: 'joinSection_ctaSecondary_url',
      title: 'Secondary CTA URL',
      type: 'string',
      description: 'Link for the secondary careers call-to-action',
      fieldset: 'joinSection',
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
