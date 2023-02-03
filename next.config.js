/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['links.papareact.com', 'fakestoreapi.com']
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  env: {
    NEXT_PUBLIC_URL: '/',
  },
}

module.exports = nextConfig;
