import { type SchemaTypeDefinition } from 'sanity'
import { page } from './page'
import { heroSection } from './heroSection'
import { aboutSection } from './aboutSection'
import { servicesSection } from './servicesSection'
import { gallerySection } from './gallerySection'
import { teamSection } from './teamSection'
import { contactSection } from './contactSection'
import { globalSettings } from './globalSettings'
// Removing older schema imports as they are being replaced by the Page Builder types
// If you still need them, you can add `hero`, `features`, `richText` back.

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page,
    heroSection,
    aboutSection,
    servicesSection,
    gallerySection,
    teamSection,
    contactSection,
    globalSettings
  ],
}
