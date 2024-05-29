import type { MetadataRoute } from 'next'
import theme from "@/app/lib/theme.json";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: '/studio/',
      },
    ],
    sitemap: `${theme.site_url}/sitemap.xml`,
  }
}