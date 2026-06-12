import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seoDefaults',
  title: 'SEO Defaults',
  type: 'document',
  // Desk structure should use S.documentTypeListItem('seoDefaults').id('seoDefaults') for this singleton
  fields: [
    defineField({
      name: '__experimental_actions',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'defaultTitle',
      title: 'Default Title',
      type: 'string',
      description: 'Fallback page title when a page has no SEO title set',
    }),
    defineField({
      name: 'titleSuffix',
      title: 'Title Suffix',
      type: 'string',
      description: 'e.g. "| Dr. Sandeep Shetty\'s Dental Clinic"',
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Default Description',
      type: 'text',
      description: 'Fallback meta description for all pages',
    }),
    defineField({
      name: 'defaultKeywords',
      title: 'Default Keywords',
      type: 'text',
      description: 'Fallback meta keywords (comma-separated)',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default OG Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Fallback Open Graph image for social sharing',
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      description: 'Twitter card format for social previews',
      options: {
        list: [
          { title: 'Summary', value: 'summary' },
          { title: 'Summary Large Image', value: 'summary_large_image' },
        ],
      },
    }),
  ],
})
