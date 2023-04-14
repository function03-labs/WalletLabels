import withSvgr from 'next-svgr'
import webpack from 'webpack'
import withWorkspaces from '@saas-ui/next-workspaces'

const isElectron = process.env.npm_package_name === 'electron-app'

export default withWorkspaces({
  workspaces: ['packages', 'saas-ui'],
  basePath: '../../',
})(
  withSvgr({
    optimizeFonts: true,
    reactStrictMode: false,
    distDir: isElectron ? '.nextron' : '.next',
    transpilePackages: ['@saas-ui/date-picker'],
    webpack: (config, options) => {
      const { isServer } = options
      if (!isServer && isElectron) {
        config.target = 'electron-renderer' // Disable this otherwise MSW doesn't work.
      }

      // Load pro packages from src instead of dist
      config.plugins = config.plugins.concat([
        new webpack.NormalModuleReplacementPlugin(
          /@saas-ui-pro\/(react|billing|router|onboarding|feature-flags|pro\/theme|pro-.*)$/,
          (resource) => {
            resource.request = resource.request + '/src'
          },
        ),
      ])

      config.resolve.extensionAlias = {
        '.js': ['.js', '.ts', 'tsx'],
        '.jsx': ['.jsx', '.tsx'],
      }

      return config
    },
  }),
)
