const path = require('path')
const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: [
    path.resolve('../../packages/**/*.stories.tsx'),
    path.resolve('../../apps/**/*.stories.tsx'),
    path.resolve('../../saas-ui/**/*.stories.tsx'),
  ],
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
  refs: () => {
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
        title: 'Saas UI', // @todo Update to main branch
        url: 'https://61fdb7be874ac7003a932b27-yidqjjhtuo.chromatic.com/',
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
}
