import path from 'path'
import { mergeConfig } from 'vite'
const toPath = (_path) => path.join(process.cwd(), _path)
export default {
  stories: [
    {
      directory: '../../',
      files: '*/!(node_modules)/**/*.@(mdx|stories.@(tsx))',
    },
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@saas-ui/storybook-addon',
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
      '@saas-ui/pro': {
        title: 'Saas UI Pro',
        url: 'https://storybook.saas-ui.pro/',
      },
      '@saas-ui/react': {
        title: 'Saas UI',
        url: 'https://storybook.saas-ui.dev/',
      },
      ...refs,
    }
  },
  // webpackFinal: async config => {
  //   return {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       mainFields: config.resolve.mainFields.concat(['source']),
  //       alias: {
  //         ...config.resolve.alias,
  //         '@emotion/core': toPath('../../node_modules/@emotion/react'),
  //         'emotion-theming': toPath('../../node_modules/@emotion/react')
  //       }
  //     },
  //     module: {
  //       ...config.module,
  //       rules: config.module.rules.concat([{
  //         test: /\.mjs$/,
  //         include: /node_modules/,
  //         type: 'javascript/auto'
  //       }])
  //     },
  //     plugins: config.plugins.concat([new webpack.NormalModuleReplacementPlugin(/\@saas-ui\/(pro|onboarding)$/, resource => {
  //       resource.request = resource.request + '/src';
  //     })])
  //   };
  // },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add storybook-specific dependencies to pre-optimization
      // optimizeDeps: {
      //   include: ['storybook-addon-designs'],
      // },
      resolve: {
        alias: [
          {
            find: /(\@saas-ui\/[a-z-\/]+)$/,
            replacement: '$1/src',
          },
        ],
      },
    })
  },
  framework: {
    name: '@storybook/react-vite',
  },
  docs: {
    autodocs: true,
  },
}
