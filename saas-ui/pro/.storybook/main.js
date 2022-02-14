const path = require('path')
const webpack = require('webpack')
const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: [path.resolve('../../libs/**/stories/*.stories.tsx')],
  addons: [
    'storybook-addon-performance/register',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-storysource',
  ],
  staticDirs: ['./static'],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        mainFields: config.resolve.mainFields.concat(['source']),
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('../../node_modules/@emotion/react'),
          'emotion-theming': toPath('../../node_modules/@emotion/react'),
        },
      },
      module: {
        ...config.module,
        rules: config.module.rules.concat([
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          },
        ]),
      },
    }
  },
}
