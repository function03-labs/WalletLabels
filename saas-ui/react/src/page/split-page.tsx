import * as React from 'react'

import {
  chakra,
  HTMLChakraProps,
  SystemStyleObject,
  useBreakpointValue,
  useDisclosure,
  UseDisclosureReturn,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { createContext } from '@chakra-ui/react-utils'

import { Page, PageProps } from './page'
import { MotionBox } from '../transitions'

const [SplitPageProvider, useSplitPage] = createContext<UseDisclosureReturn>({
  strict: true,
  errorMessage: 'SplitPage context not available.',
})

export { useSplitPage }

export interface SplitPageProps
  extends Omit<HTMLChakraProps<'div'>, 'children'> {
  defaultIsOpen?: boolean
  isOpen?: boolean
  onClose?(): void
  onOpen?(): void
  orientation?: 'vertical' | 'horizontal'
  children: [React.ReactElement, React.ReactElement]
  breakpoints?: Record<string, string | boolean> | (string | boolean)[]
  breakpoint?: string
}

export const SplitPage: React.FC<SplitPageProps> = (props) => {
  const {
    children,
    defaultIsOpen,
    onClose,
    onOpen,
    isOpen,
    orientation,
    breakpoint = 'lg',
    ...rest
  } = props

  const styles = useMultiStyleConfig('SuiSplitPage', props)

  const isMobile = useBreakpointValue(
    {
      base: true,
      [breakpoint]: false,
    },
    {
      fallback: breakpoint,
      ssr: false,
    },
  )

  const context = useDisclosure({
    defaultIsOpen: defaultIsOpen || !isMobile,
    onClose,
    onOpen,
    isOpen,
  })

  const containerStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    flex: 1,
    ...styles.container,
  }

  const contentStyles: SystemStyleObject = {
    ...styles.content,
    ...(isMobile
      ? {
          position: 'absolute',
          zIndex: 'docked',
          top: 0,
          right: { base: '-100%', lg: '0' },
          bottom: 0,
          width: '100%',
        }
      : {}),
  }

  const [startPage, endPage] = children

  return (
    <SplitPageProvider value={context}>
      <chakra.main
        __css={containerStyles}
        className="saas-split-page__container"
        {...rest}
      >
        {startPage}
        <MotionBox
          animate={context.isOpen ? 'enter' : 'exit'}
          variants={{
            enter: {
              right: 0,
              opacity: 1,
              transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
            },
            exit: { right: '-100%', opacity: 0 },
          }}
          __css={contentStyles}
          className={'saas-split-page__content'}
        >
          {endPage}
        </MotionBox>
      </chakra.main>
    </SplitPageProvider>
  )
}
