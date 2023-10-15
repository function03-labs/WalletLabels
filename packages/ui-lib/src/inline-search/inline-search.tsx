import * as React from 'react'
import {
  Box,
  IconButton,
  forwardRef,
  useBreakpointValue,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'

import { useHotkeys } from '@saas-ui/react'

import { SearchInput, SearchInputProps } from '../search-input'
import { XIcon } from 'lucide-react'

/**
 * InlineSearch input to be used in toolbars.
 */
export const InlineSearch = forwardRef<SearchInputProps, 'input'>(
  (props, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const isMobile = useBreakpointValue({ base: true, lg: false })

    useHotkeys(
      'ctrl+f',
      (e) => {
        e.preventDefault()
        inputRef.current?.focus()
      },
      [],
    )

    const [value, setValue] = React.useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const onClick = () => {
      if (!isOpen) {
        onOpen()
        inputRef.current?.focus()
      }
    }

    const onReset = () => {
      setValue('')
      onClose()
    }

    const resetButton = isMobile ? (
      <IconButton
        onClick={onReset}
        size="xs"
        variant="ghost"
        aria-label="Reset search"
        icon={<XIcon />}
      />
    ) : undefined

    const styles = isMobile
      ? !isOpen
        ? {
            width: '34px',
            '& .chakra-input__right-element': {
              display: 'none',
            },
            '& input': {
              pr: 0,
            },
          }
        : {
            width: 'full',
            maxW: '260px',
            overflow: 'hidden',
            position: 'absolute',
            right: 0,
            px: 4,
            py: 2,
            mt: -2,
            bg: 'app-background',
            zIndex: 1,
          }
      : {}

    return (
      <Box onClick={onClick}>
        <Box sx={styles}>
          <SearchInput
            ref={useMergeRefs(ref, inputRef)}
            size="sm"
            width={{ base: isOpen ? 'full' : 8, lg: 60 }}
            pr={0}
            onReset={onReset}
            rightElement={resetButton}
            value={value}
            {...props}
          />
        </Box>
      </Box>
    )
  },
)
