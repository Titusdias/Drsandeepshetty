/**
 * Maps each Sanity document `_type` to Next.js cache tags and paths
 * that should be revalidated when that document is published or updated.
 *
 * Use `revalidateTag` for granular cache invalidation and `revalidatePath`
 * as a fallback in the webhook handler at /api/revalidate.
 */
export const webhookRevalidationMap: Record<string, string[]> = {
  siteSettings: ['layout', '/'],
  branch: ['branches', '/'],
  homePage: ['home', '/'],
  aboutPage: ['about', '/about'],
  servicesPage: ['services', '/services'],
  teamMember: ['team', '/team'],
  teamPage: ['team', '/team'],
  galleryItem: ['gallery', '/gallery'],
  gallerySection: ['gallery', '/gallery'],
  galleryPage: ['gallery', '/gallery'],
  contactPage: ['contact', '/contact'],
  navigationMenu: ['nav', '/'],
  seoDefaults: ['seo', '/'],
}
