/** @type {import('next').NextConfig} */
const withImages = require('next-images')
const nextConfig = {
  images: {
    unoptimized: true,
  },
  staticPageGenerationTimeout: 1000,
  reactStrictMode: false,
 
  //withImages(),
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/profile_images/**',
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
        port: '',
        pathname: '/**',

      }
    ],
    

    
  },





  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin"] },
      },
    ],
  },

}

module.exports = nextConfig

