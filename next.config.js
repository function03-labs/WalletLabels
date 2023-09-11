/** @type {import('next').NextConfig} */
const withImages = require('next-images')
const nextConfig = {
  staticPageGenerationTimeout: 1000,
  reactStrictMode: false,
   async rewrites() {

    return [
      {source: "/api/:path*",
      destination: `https://onceupon.gg/api/:path*`,}
    ]
  },
  //withImages(),
  images: {
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

