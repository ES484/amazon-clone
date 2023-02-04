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
    GOOGLE_ID:'621563810007-v91bcvs3ha2dq0f82mrbplkg6bii1hvn.apps.googleusercontent.com',
    GOOGLE_SECRET:'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'
  },
  staticPageGenerationTimeout: 60,
}

module.exports = nextConfig;
