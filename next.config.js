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
    PUBLIC_URL: '/',
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  },
  staticPageGenerationTimeout: 60,
}

module.exports = nextConfig;
