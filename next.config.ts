const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const vanillaExtractPlugin = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webchart.thinkpool.com'
      },
      {
        protocol: 'https',
        hostname: 'ads-partners.coupang.com'
      }
    ]
  }
}

module.exports = vanillaExtractPlugin(nextConfig)
