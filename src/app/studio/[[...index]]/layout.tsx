import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio'

// Set the right `viewport`, `robots` and `referer` meta tags
export const metadata = {
  ...studioMetadata,
  // Overrides the default metadata if needed
  title: 'Loading Studio...',
}

export const viewport = {
  ...studioViewport,
  // Overrides the default viewport if needed
  interactiveWidget: 'resizes-content',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
