const withSvgr = require('next-svgr')

const withWorkspaces = require('@saas-ui/next-workspaces')

module.exports = withWorkspaces({
  workspaces: ['packages', 'saas-ui'],
  basePath: '../../',
})(
  withSvgr({
    swcMinify: false,
    experimental: {
      optimizeFonts: true,
      modern: true,
    },
    // async rewrites() {
    //   return [
    //     {
    //       source: '/:any*',
    //       destination: '/',
    //     },
    //   ]
    // },
  }),
)
