module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /node_modules\/@saas-ui\/(pro|billing|charts|date-picker|features|onboarding|router)\/.*\.tsx?/,
        use: [options.defaultLoaders.babel],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  })
}
