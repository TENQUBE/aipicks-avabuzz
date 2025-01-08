const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const vanillaExtractPlugin = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
}

module.exports = vanillaExtractPlugin(nextConfig)
