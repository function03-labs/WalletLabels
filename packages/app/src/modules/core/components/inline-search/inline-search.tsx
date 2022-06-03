import * as React from 'react'
import { Box, forwardRef } from '@chakra-ui/react'

import { SearchInput, SearchInputProps } from '../search-input'

/**
 * InlineSearch input to be used in toolbars.
 */
export const InlineSearch = forwardRef<SearchInputProps, 'input'>(
  (props, ref) => {
    return (
      <Box>
        <SearchInput ref={ref} size="sm" {...props} />
      </Box>
    )
  },
)
