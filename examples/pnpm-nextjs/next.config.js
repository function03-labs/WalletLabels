/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /node_modules\/@saas-ui\/(pro|charts|billing|features|onboarding)\/.*\.tsx?/,
      use: [defaultLoaders.babel],
    })
    return config
  },
}

module.exports = nextConfig
