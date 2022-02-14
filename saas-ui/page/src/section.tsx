import { Flex, Box, BoxProps, Heading, Text } from '@chakra-ui/react'

import { Loading } from '@saas-ui/react'

export interface SectionProps extends BoxProps {
  title?: string
  description?: string
  annotated?: boolean
  size?: number
  isLoading?: boolean
  children: React.ReactNode
}

export function Section({
  title,
  description,
  annotated,
  size,
  isLoading,
  children,
  ...otherProps
}: SectionProps) {
  let heading
  if (title || description || annotated) {
    heading = (
      <Box mb="4" w={annotated ? '30%' : ''} flexShrink={0}>
        <Heading size="md" mb="4">
          {title}
        </Heading>
        {description && (
          <Text size="md" color="gray.400">
            {description}
          </Text>
        )}
      </Box>
    )
  }

  let basis
  switch (size) {
    case 1 / 2:
      basis = '34em'
      break
    case 1 / 3:
      basis = '18em'
      break
    default:
      basis = '48em'
  }

  let content
  if (isLoading) {
    content = <Loading p={4} />
  } else {
    content = children
  }

  return (
    <Flex
      direction={annotated ? 'row' : 'column'}
      mr="4"
      mt="4"
      grow={1}
      shrink={1}
      basis={basis}
      borderBottomWidth={annotated ? 1 : 0}
      pb={annotated ? 8 : 0}
      mb={annotated ? 4 : 0}
      maxWidth="100%"
      {...otherProps}
    >
      {heading}
      <Box flex="1" minWidth="0">
        {' '}
        {/* set minWidth to prevent long text without breaks from overflowing */}
        {content}
      </Box>
    </Flex>
  )
}
