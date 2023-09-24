import { Meta } from '@storybook/react'
import { useState } from 'react'
import {
  DateRange,
  DateRangePicker,
  DateRangePresets,
  getRangeDiff,
  getRangeValue,
} from './date-range-picker'
import { Toolbar } from '@saas-ui-pro/react'
import { SegmentedControl } from '../segmented-control'

export default {
  title: 'Components/DateRangePicker',
} as Meta

export const Presets = () => {
  const [range, setRange] = useState('30d')
  const [dateRange, setDateRange] = useState(getRangeValue('30d'))
  const onPresetChange = (preset: string) => {
    if (preset !== 'custom') {
      setDateRange(getRangeValue(preset as DateRangePresets))
    }
    setRange(preset)
  }

  const onRangeChange = (range: DateRange) => {
    const diff = getRangeDiff(range)
    if ([1, 3, 7, 30].includes(diff)) {
      setRange(`${diff}`)
    } else {
      setRange('custom')
    }

    setDateRange(range)
  }

  return (
    <Toolbar justifyContent="flex-start" variant="tertiary" size="xs">
      <SegmentedControl
        segments={[
          {
            id: '1d',
            label: '1d',
          },
          {
            id: '3d',
            label: '3d',
          },
          {
            id: '7d',
            label: '7d',
          },
          { id: '30d', label: '30d' },
          { id: 'custom', label: 'Custom' },
        ]}
        value={range}
        onChange={onPresetChange}
      />
      <DateRangePicker value={dateRange} onChange={onRangeChange} />
    </Toolbar>
  )
}
