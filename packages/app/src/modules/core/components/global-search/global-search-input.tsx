import * as React from 'react'
import { forwardRef, useMergeRefs } from '@chakra-ui/react'

import { useHotkeysShortcut } from '@saas-ui/react'
import { Command } from '@saas-ui/pro'

import { SearchInput } from '../search-input'

export const GlobalSearchInput = forwardRef((props, ref) => {
  const searchRef = React.useRef<HTMLInputElement>(null)

  const searchCommand = useHotkeysShortcut('general.search', () => {
    searchRef.current?.focus()
  })

  return (
    <SearchInput
      ref={useMergeRefs(ref, searchRef)}
      size="sm"
      sx={{
        borderColor: 'sidebar-border-color',
        _hover: {
          borderColor: 'sidebar-on',
        },
        '::placeholder': {
          color: 'sidebar-muted',
        },
      }}
      rightElement={
        <Command
          sx={{
            '.chakra-kbd': {
              bg: 'sidebar-on-muted',
              color: 'sidebar-text',
            },
          }}
        >
          {searchCommand}
        </Command>
      }
    />
  )
})
