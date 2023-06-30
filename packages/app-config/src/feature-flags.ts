import { FeaturesOptions } from '@saas-ui-pro/feature-flags'

export const segments = {
  segments: [
    {
      id: 'admin',
      attr: [
        {
          key: 'roles',
          value: 'admin',
        },
      ],
      features: ['settings', 'billing'],
    },
  ],
} satisfies FeaturesOptions
