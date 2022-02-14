import * as React from 'react'
import {
  Sparklines as ReactSparklines,
  SparklinesLine,
  SparklinesSpots,
} from 'react-sparklines'
import { Box, useTheme } from '@chakra-ui/react'

export interface SparklineProps {
  data: Array<number>
  limit?: number
  height?: number
  color?: string
}

export function Sparklines({
  data,
  limit,
  height,
  color = 'blue',
}: SparklineProps) {
  const theme = useTheme()

  const stroke = theme.colors[color][500]

  return (
    <Box>
      <ReactSparklines data={data} limit={limit} height={height}>
        <SparklinesLine
          style={{ fill: 'none', strokeWidth: 2 }}
          color={stroke}
        />
        <SparklinesSpots style={{ fill: stroke }} />
      </ReactSparklines>
    </Box>
  )
}
