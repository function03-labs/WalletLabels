import withSvgr from 'next-svgr'
import webpack from 'webpack'
import bundleAnalyzer from '@next/bundle-analyzer'
import withWorkspaces from '@saas-ui/next-workspaces'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const isElectron = process.env.npm_package_name === 'electron-app'

/**
 * This plugin is only required if you are using the `saas-ui` packages in this repository.
 * If you are using the private npm registry, you can remove this plugin.
 */
const SaasUIProPlugin = () => {
  return new webpack.NormalModuleReplacementPlugin(
    /@saas-ui-pro\/(react|billing|router|onboarding|feature-flags|kanban|kanban-.*|pro\/theme|pro-.*|theme-.*)$/,
    (resource) => {
      resource.request = resource.request + '/src'
    },
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Improve performance on dev,
    // @see: https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports
    optimizePackageImports: ['lucide-react', 'react-icons/*', 'recharts'],
  },
  optimizeFonts: true,
  reactStrictMode: false,
  distDir: isElectron ? '.nextron' : '.next',
  transpilePackages: ['@saas-ui/date-picker'],
  output: 'standalone',
  webpack: (config, options) => {
    const { isServer } = options
    if (!isServer && isElectron) {
      config.target = 'electron-renderer'
    }

    // Load pro packages from src instead of dist
    config.plugins = config.plugins.concat([SaasUIProPlugin()])

    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', 'tsx'],
      '.jsx': ['.jsx', '.tsx'],
    }

    return config
  },
}

export default withWorkspaces({
  workspaces: ['packages', 'saas-ui'],
  basePath: '../../',
})(withBundleAnalyzer(withSvgr(nextConfig)))
