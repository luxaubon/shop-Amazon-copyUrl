/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ['mongoose']
    },
    images: {
      domains: ['m.media-amazon.com','www.melivecode.com','i.imgur.com']

    }
  }
  
  module.exports = nextConfig