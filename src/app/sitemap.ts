import { MetadataRoute } from 'next'
import { CLINIC } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CLINIC.url || 'https://www.drsandeepshetty.in'

  const routes = [
    '',
    '/about',
    '/services',
    '/gallery',
    '/team',
    '/contact',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
