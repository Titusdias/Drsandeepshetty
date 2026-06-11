import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7xk15ogt',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'My Sanity Studio',
  schema,
  plugins: [structureTool(), visionTool()],
})
