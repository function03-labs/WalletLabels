const path = require('path')
const withSvgr = require('next-svgr')

const withWorkspaces = require('@saas-ui/next-workspaces')

const isElectron = process.env.npm_package_name === 'electron-app'

module.exports = withWorkspaces({
  workspaces: ['packages', 'saas-ui'],
  basePath: '../../',
})(
  withSvgr({
    experimental: {
      optimizeFonts: true,
      modern: true,
    },
    distDir: isElectron ? '.nextron' : '.next',
    webpack: (config, options) => {
      const { isServer } = options
      if (!isServer && isElectron) {
        config.target = 'electron-renderer'
      }

      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        include: ['packages', 'saas-ui'].map((workspace) =>
          path.resolve(__dirname, '../../', workspace),
        ),
        exclude: /node_modules/,
        use: options.defaultLoaders.babel,
      })

      return config
    },
  }),
)
