import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'servicesPage',
  'teamPage',
  'galleryPage',
  'contactPage',
  'navigationMenu',
  'seoDefaults',
])

const singletonItems = [
  { type: 'siteSettings', title: 'Site Settings' },
  { type: 'homePage', title: 'Home Page' },
  { type: 'aboutPage', title: 'About Page' },
  { type: 'servicesPage', title: 'Services Page' },
  { type: 'teamPage', title: 'Team Page' },
  { type: 'galleryPage', title: 'Gallery Page' },
  { type: 'contactPage', title: 'Contact Page' },
  { type: 'navigationMenu', title: 'Navigation Menu' },
  { type: 'seoDefaults', title: 'SEO Defaults' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...singletonItems.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? '')
      ),
    ])
