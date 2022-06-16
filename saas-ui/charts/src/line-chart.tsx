import * as React from 'react'

import {
  Box,
  SystemProps,
  useColorModeValue,
  useStyleConfig,
  useTheme,
} from '@chakra-ui/react'
import { css } from '@chakra-ui/styled-system'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface ChartData {
  x: number
  xv: string
  y: number
  yv: string
}

export interface LineChartProps {
  data: ChartData[]
  height: SystemProps['height']
  showGrid?: boolean
  color?: string
  strokeWidth?: string
  name?: string
  tickFormatter?: (value: number) => string
  variant?: 'line' | 'solid' | 'gradient'
}

export const LineChart = (props: LineChartProps) => {
  const {
    data,
    height,
    showGrid = true,
    color = 'primary',
    strokeWidth,
    name,
    tickFormatter,
    variant,
  } = props

  const theme = useTheme()

  const styles = useStyleConfig('Tooltip')

  const strokeColor = theme.colors[color]?.[500]

  const fill = (() => {
    switch (variant) {
      case 'solid':
        return strokeColor
      case 'gradient':
        return 'url(#chart-gradient)'
      default:
        return 'transparent'
    }
  })()

  const tooltipStyles = React.useMemo(
    () =>
      css({
        ...styles,
        borderRadius: 'md',
        borderColor: 'inherit',
        flexDirection: 'column',
      })(theme),
    [theme, styles],
  )

  return (
    <Box height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid
              strokeDasharray=" 1 1 1"
              vertical={false}
              strokeOpacity={useColorModeValue(0.8, 0.3)}
            />
          )}
          <XAxis dataKey="xv" />
          <YAxis dataKey="y" tickFormatter={tickFormatter} />
          <Tooltip
            formatter={(value: string, name: string, props: any) => {
              return props.payload.yv
            }}
            contentStyle={tooltipStyles}
          />
          <Area
            type="monotone"
            dataKey="y"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill={fill}
            name={name}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
