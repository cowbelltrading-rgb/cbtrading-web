import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemas'

const singletonTypes = ['siteSettings', 'homepage', 'aboutCompany']

export default defineConfig({
  name: 'cowbell-keystone',
  title: 'Cowbell Keystone — Content Manager',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qyx6qjer',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('🏢 Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),

            // Singleton: Homepage
            S.listItem()
              .title('🏠 Homepage')
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),

            // Singleton: About Company
            S.listItem()
              .title('📖 About Company')
              .id('aboutCompany')
              .child(
                S.document()
                  .schemaType('aboutCompany')
                  .documentId('aboutCompany')
              ),

            S.divider(),

            // Services
            S.listItem()
              .title('⚙️ Services')
              .schemaType('service')
              .child(S.documentTypeList('service').title('Services')),

            // Products
            S.listItem()
              .title('📦 Products & Materials')
              .schemaType('product')
              .child(S.documentTypeList('product').title('Products & Materials')),

            // Resources
            S.listItem()
              .title('📄 Resources & Downloads')
              .schemaType('resource')
              .child(S.documentTypeList('resource').title('Resources & Downloads')),
          ]),
    }),

    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],

  schema,

  document: {
    // Prevent creation of additional singleton documents
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (tpl) => !singletonTypes.includes(tpl.templateId),
        )
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.includes(schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate')
      }
      return prev
    },
  },
})
