import { MetadataRoute } from 'next'
import { CLINIC } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = CLINIC.url || 'https://www.drsandeepshetty.in'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
 