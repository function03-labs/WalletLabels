import * as React from 'react'

import {
  chakra,
  forwardRef,
  Stack,
  Flex,
  Button,
  SimpleGrid,
  Box,
  StackProps,
} from '@chakra-ui/react'
import { useStyles } from '../styles.provider'
import { useYears, useYear } from '../use-date-picker'

export const Years = forwardRef<StackProps, 'div'>((props, ref) => {
  const styles = useStyles()

  const { date, yearsLabel, years, getLabelProps } = useYears()

  return (
    <Stack ref={ref} flexDirection="column" py="1" {...props}>
      <Flex sx={styles.yearsLabel}>
        <Button {...getLabelProps()}>{yearsLabel}</Button>
      </Flex>
      <Box overflow="auto" maxH="254px">
        <SimpleGrid columns={4} gap="2" columnGap="5">
          {years.map((year) => (
            <Year key={year} date={date} year={year} />
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  )
})

interface YearProps {
  date: Date
  year: number
}

const Year: React.FC<YearProps> = (props) => {
  const styles = useStyles()

  const { year } = props
  const buttonProps = useYear(props)

  return (
    <chakra.button {...buttonProps} __css={styles.year}>
      {year}
    </chakra.button>
  )
}
