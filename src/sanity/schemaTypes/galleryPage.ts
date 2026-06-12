import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  // Desk structure should use S.documentTypeListItem('galleryPage').id('galleryPage') for this singleton
  fieldsets: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    defineField({
      name: 'hero_sectionLabel',
      title: 'Section Label',
      type: 'string',
      description: 'Small label above the hero heading',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_heading',
      title: 'Heading',
      type: 'string',
      description: 'Main headline for the Gallery page',
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
      name: 'seo',
      title: 'SEO',
      type: 'pageSeo',
      description: 'Page-specific SEO overrides',
      fieldset: 'seo',
    }),
  ],
})
