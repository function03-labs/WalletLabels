/** @type {import('next').NextConfig} */
const withImages = require('next-images')
const nextConfig = {
  staticPageGenerationTimeout: 1000,
  reactStrictMode: false,
  //withImages(),
  images: {
    dangerouslyAllowSVG: true
    
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

