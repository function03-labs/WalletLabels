import { Meta } from '@storybook/react'
import { SegmentedControl } from './'

export default {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
} as Meta

export const Default = {
  args: {
    segments: [
      {
        label: 'Segment 1',
        value: 'segment-1',
      },
      {
        label: 'Segment 2',
        value: 'segment-2',
      },
    ],
  },
}
