const path = require('path')

const webpack = require('webpack')

const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: [path.resolve('../**/*.stories.@(tsx|mdx)')],
  addons: [
    'storybook-addon-swc',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-links',
  ],
  staticDirs: ['./static'],
  typescript: {
    reactDocgen: false,
  },
  refs: (config, { configType }) => {
    const refs = {
      '@chakra-ui/react': {
        disable: true, // Make sure Chakra gets loaded last
      },
      chakra: {
        title: 'Chakra UI',
        url: 'https://storybook.chakra-ui.com',
      },
    }

    return {
      '@saas-ui/react': {
        title: 'Saas UI',
        url: 'https://storybook.saas-ui.dev',
      },
      ...refs,
    }
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
  core: {
    builder: 'webpack5',
  },
}
