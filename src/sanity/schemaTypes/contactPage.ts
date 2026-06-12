import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  // Desk structure should use S.documentTypeListItem('contactPage').id('contactPage') for this singleton
  fieldsets: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'form', title: 'Contact Form' },
    { name: 'map', title: 'Map' },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    defineField({
      name: '__experimental_actions',
      type: 'string',
      hidden: true,
    }),
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
      description: 'Main headline for the Contact page',
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
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      description: 'Headline above the contact form',
      fieldset: 'form',
    }),
    defineField({
      name: 'formSubheading',
      title: 'Form Subheading',
      type: 'text',
      description: 'Supporting text above the contact form fields',
      fieldset: 'form',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Map Embed URL',
      type: 'url',
      description: 'Google Maps embed URL for the clinic location',
      fieldset: 'map',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      description: 'Message shown after a successful form submission',
      fieldset: 'form',
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
