import { FeaturesOptions } from '@saas-ui/features'

const options: FeaturesOptions = {
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

export default options
