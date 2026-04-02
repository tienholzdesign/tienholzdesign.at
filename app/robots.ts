import type { MetadataRoute } from 'next';
import config from '../utils/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `https://www.${config.project.url}/sitemap.xml`,
  };
}
