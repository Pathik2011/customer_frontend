import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev';
  const baseUrl = 'https://sapanafertilizer.com';

  // 1. If DEV: Block Everything
  if (isDev) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      // No sitemap for dev
    };
  }

  // 2. If PROD: Allow indexing + Point to Sitemap
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow private pages users shouldn't search for
      disallow: ['/bag', '/checkout', '/auth-callback', '/profile'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}