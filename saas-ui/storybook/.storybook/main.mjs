import { mergeConfig } from 'vite'
export default {
  stories: [
    {
      directory: '../../',
      files: '*/!(node_modules)/**/*.@(mdx|stories.@(tsx))',
    },
  ],
  features: {
    previewMdx2: true,
  },
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-links',
  ],
  staticDirs: ['./static'],
  typescript: {
    reactDocgen: true,
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
            find: /(\@saas-ui-pro\/[a-z-\/]+)$/,
            replacement: '$1/src',
          },
        ],
      },
    })
  },
  framework: {
    name: '@storybook/react-vite',
  },
}
