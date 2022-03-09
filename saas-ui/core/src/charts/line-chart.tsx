import * as React from 'react'

import { Box, SystemProps, useColorModeValue, useTheme } from '@chakra-ui/react'

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
  } = props

  const theme = useTheme()

  const stroke = theme.colors[color]?.[500]

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
            contentStyle={{
              color: 'black',
              borderRadius: 'var(--chakra-radii-md)',
            }}
          />
          <Area
            type="monotone"
            dataKey="y"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            name={name}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
