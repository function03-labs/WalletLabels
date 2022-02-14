const path = require('path')
const withWorkspaces = require('@saas-ui/next-workspaces')

module.exports = withWorkspaces({
  workspaces: ['packages', 'libs'],
  basePath: '../../',
})({
  experimental: {
    // externalDir: true,
  },
  webpack: (config, options) => {
    const { isServer } = options
    if (!isServer) {
      config.target = 'electron-renderer'
    }

    return config
  },
})
