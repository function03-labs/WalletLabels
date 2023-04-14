import { FeaturesOptions } from '@saas-ui-pro/feature-flags'

export const segments: FeaturesOptions = {
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
}
