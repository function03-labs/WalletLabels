import { FeaturesOptions } from '../provider'

const options: FeaturesOptions = {
  segments: [
    {
      id: 'admin',
      attr: [
        {
          key: 'role',
          value: 'admin',
        },
      ],
      features: ['settings', { id: 'value-feature', value: 'enabled' }],
    },
    {
      id: 'proPlan',
      attr: [
        {
          key: 'plan',
          value: 'pro',
        },
      ],
      features: ['inbox'],
    },
  ],
}

export default options
