import { Meta } from '@storybook/react'
import { IntlProvider } from 'react-intl'
import { DateTimeSince, DateTimeSinceProps } from './'

export default {
  title: 'Components/DateTimeSince',
  component: DateTimeSince,
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as Meta

export const Default = {
  args: {
    date: new Date().setMinutes(new Date().getMinutes() - 5),
  },
}
