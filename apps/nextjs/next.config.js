const withSvgr = require('next-svgr')

const withWorkspaces = require('@saas-ui/next-workspaces')

module.exports = withWorkspaces({
  workspaces: ['packages', 'saas-ui'],
  basePath: '../../',
})(
  withSvgr({
    experimental: {
      optimizeFonts: true,
      modern: true,
    },
    webpack: (config, options) => {
      const { isServer } = options
      if (!isServer && process.env.npm_package_name === 'electron-app') {
        config.target = 'electron-renderer'
      }

      return config
    },
  }),
)
