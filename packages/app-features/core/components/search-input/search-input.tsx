import * as React from 'react'

import {
  SearchInput as BaseSearchInput,
  SearchInputProps,
} from '@saas-ui/react'

import { FiSearch, FiX } from 'react-icons/fi'
import { forwardRef } from '@chakra-ui/react'

export type { SearchInputProps }

/**
 * SearchInput with Feather icons.
 */
export const SearchInput = forwardRef<SearchInputProps, 'input'>(
  (props, ref) => {
    return (
      <BaseSearchInput
        ref={ref}
        icon={<FiSearch />}
        resetIcon={<FiX />}
        {...props}
      />
    )
  },
)
