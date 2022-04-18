/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/bookshelf',
  assetPrefix: '/bookshelf/',
  images: {
    domains: ['i.gr-assets.com'],
  },
}

module.exports = nextConfig
