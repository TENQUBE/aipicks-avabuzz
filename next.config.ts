const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const vanillaExtractPlugin = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
}

module.exports = vanillaExtractPlugin(nextConfig)
