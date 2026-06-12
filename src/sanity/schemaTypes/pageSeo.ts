import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageSeo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the page title shown in browser tabs and search results',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Meta description for search engines (aim for 150–160 characters)',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'text',
      description: 'Comma-separated keywords for this page',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown when this page is shared on social media',
    }),
  ],
})
