import * as React from 'react'
import { Box } from '@chakra-ui/react'

import { SearchInput, SearchInputProps } from '@saas-ui/react'

export const InlineSearch: React.FC<SearchInputProps> = (props) => {
  return (
    <Box>
      <SearchInput size="sm" {...props} />
    </Box>
  )
}
