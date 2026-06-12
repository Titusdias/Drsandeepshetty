import { type SchemaTypeDefinition } from 'sanity'

import pageSeo from './pageSeo'
import omanBranch from './omanBranch'
import siteSettings from './siteSettings'
import branch from './branch'
import homePage from './homePage'
import aboutPage from './aboutPage'
import servicesPage from './servicesPage'
import teamMember from './teamMember'
import teamPage from './teamPage'
import galleryItem from './galleryItem'
import galleryPage from './galleryPage'
import contactPage from './contactPage'
import navigationMenu from './navigationMenu'
import seoDefaults from './seoDefaults'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pageSeo,
    omanBranch,
    siteSettings,
    branch,
    homePage,
    aboutPage,
    servicesPage,
    teamMember,
    teamPage,
    galleryItem,
    galleryPage,
    contactPage,
    navigationMenu,
    seoDefaults,
  ],
}
