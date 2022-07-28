const path = require('path')
const withSvgr = require('next-svgr')
const webpack = require('webpack')
const withWorkspaces = require('@saas-ui/next-workspaces')

const isElectron = process.env.npm_package_name === 'electron-app'

module.exports = withWorkspaces({
  workspaces: ['packages', 'saas-ui'],
  basePath: '../../',
})(
  withSvgr({
    optimizeFonts: true,
    reactStrictMode: false,
    distDir: isElectron ? '.nextron' : '.next',
    webpack: (config, options) => {
      const { isServer } = options
      if (!isServer && isElectron) {
        // config.target = 'electron-renderer' // Disable this otherwise MSW doesn't work.
      }

      // Load pro packages from src instead of dist
      config.plugins = config.plugins.concat([
        new webpack.NormalModuleReplacementPlugin(
          /\@saas-ui\/(pro|billing|date-picker|charts|router|onboarding|features|paddle.*|pro\/theme)$/,
          (resource) => {
            resource.request = resource.request + '/src'
          },
        ),
      ])

      return config
    },
  }),
)
