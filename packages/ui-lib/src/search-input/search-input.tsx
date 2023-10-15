import * as React from 'react'

import {
  SearchInput as BaseSearchInput,
  SearchInputProps,
} from '@saas-ui/react'

import { SearchIcon, XIcon } from 'lucide-react'
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
        icon={<SearchIcon size="1.2em" />}
        resetIcon={<XIcon size="1.6em" />}
        {...props}
      />
    )
  },
)
