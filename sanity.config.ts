import { defineConfig, isDev, type DocumentActionProps, useClient } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemaTypes'
import { structure, singletonTypes } from './src/sanity/structure'

const RecreateSingletonAction = (props: DocumentActionProps) => {
  const { id, type, draft, published } = props
  const client = useClient({ apiVersion: '2024-01-01' })

  // Only show this action if the document does not exist (both draft and published are null)
  if (draft || published) {
    return null
  }

  return {
    label: 'Recreate Page',
    tone: 'positive' as const,
    onHandle: async () => {
      await client.createIfNotExists({
        _id: id,
        _type: type,
      })
    },
  }
}

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7xk15ogt',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: "Dr. Sandeep Shetty — CMS",
  schema,
  plugins: [structureTool({ structure }), visionTool()],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (template) => !singletonTypes.has(template.templateId)
        )
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        // Remove duplicate action and add our custom Recreate action
        return [
          RecreateSingletonAction,
          ...prev.filter(({ action }) => action !== 'duplicate')
        ]
      }
      return prev
    },
  },
})
