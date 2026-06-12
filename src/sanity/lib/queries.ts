/** GROQ queries for Sanity document types — cache tags match webhookRevalidationMap */

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  clinicName,
  tagline,
  logo,
  phone,
  whatsappNumber,
  bookingUrl,
  instagramUrl,
  facebookUrl,
  googleReviewUrl,
  privacyNotice,
  copyrightText,
  hours,
  googleRating,
  reviewCount,
  yearsExperience,
  patientCount,
  omanBranch
}`

export const navigationMenuQuery = `*[_type == "navigationMenu"][0]{
  items,
  ctaLabel,
  ctaUrl
}`

export const seoDefaultsQuery = `*[_type == "seoDefaults"][0]{
  defaultTitle,
  titleSuffix,
  defaultDescription,
  defaultKeywords,
  defaultOgImage,
  twitterCard
}`

export const homePageQuery = `*[_type == "homePage"][0]{
  hero_badge,
  hero_certBadge,
  hero_heading,
  hero_subheading,
  hero_description,
  hero_ctaPrimary_label,
  hero_ctaPrimary_url,
  hero_ctaSecondary_label,
  hero_ctaSecondary_url,
  hero_hoursNote,
  hero_backgroundImage,
  hero_inlineImage,
  intro_sectionLabel,
  intro_heading,
  intro_body,
  intro_bullets,
  intro_ctaLabel,
  intro_ctaUrl,
  intro_image1,
  intro_image2,
  intro_trustNote,
  whyUs_sectionLabel,
  whyUs_heading,
  whyUs_ctaLabel,
  whyUs_ctaUrl,
  whyUs_cards,
  reviews_sectionLabel,
  reviews_heading,
  reviews_subheading,
  reviews_items,
  locations_sectionLabel,
  locations_heading,
  locations_subheading,
  cta_sectionLabel,
  cta_heading,
  cta_hoursNote,
  cta_primaryLabel,
  cta_primaryUrl,
  cta_whatsappLabel,
  seo
}`

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  hero_sectionLabel,
  hero_heading,
  hero_body,
  hero_ctaPrimary_label,
  hero_ctaPrimary_url,
  hero_ctaSecondary_label,
  hero_ctaSecondary_url,
  hero_videoFile{ asset->{ url } },
  philosophy_heading,
  philosophy_body,
  philosophy_pillars,
  seo
}`

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  hero_sectionLabel,
  hero_heading,
  hero_subheading,
  hero_ctaLabel,
  hero_ctaUrl,
  categories[]{ title, description, icon },
  invisalign_heading,
  invisalign_subheading,
  invisalign_body,
  invisalign_logo,
  directory_heading,
  directory_note,
  directory_items,
  seo
}`

export const teamPageQuery = `*[_type == "teamPage"][0]{
  hero_sectionLabel,
  hero_heading,
  hero_subheading,
  joinSection_heading,
  joinSection_body,
  joinSection_ctaPrimary_label,
  joinSection_ctaPrimary_url,
  joinSection_ctaSecondary_label,
  joinSection_ctaSecondary_url,
  seo
}`

export const teamMembersQuery = `*[_type == "teamMember" && isActive != false] | order(order asc) {
  name,
  "slug": slug.current,
  role,
  bio,
  photo,
  specializations,
  qualifications
}`

export const galleryPageQuery = `*[_type == "galleryPage"][0]{
  hero_sectionLabel,
  hero_heading,
  hero_subheading,
  seo
}`

export const galleryItemsQuery = `*[_type == "galleryItem" && isActive != false] | order(order asc) {
  title,
  image {
    asset->,
    hotspot,
    crop
  },
  altText,
  category
}`

export const contactPageQuery = `*[_type == "contactPage"][0]{
  hero_sectionLabel,
  hero_heading,
  hero_subheading,
  formHeading,
  formSubheading,
  mapEmbedUrl,
  successMessage,
  seo
}`

export const branchesQuery = `*[_type == "branch" && isActive != false] | order(order asc) {
  name,
  label,
  city,
  address,
  phone,
  googleMapsUrl
}`

export function sanityFetchOptions(tag: string) {
  return { next: { tags: [tag] } }
}
