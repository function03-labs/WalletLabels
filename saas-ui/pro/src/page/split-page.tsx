import * as React from 'react'

import {
  chakra,
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

export interface SplitPageProps extends PageProps {
  content?: React.ReactNode
  defaultIsOpen?: boolean
  isOpen?: boolean
  onClose?(): void
  onOpen?(): void
}

export const SplitPage: React.FC<SplitPageProps> = (props) => {
  const {
    content,
    defaultIsOpen,
    onClose,
    onOpen,
    isOpen,
    width = '30%',
    maxW = '360px',
    ...rest
  } = props

  const styles = useMultiStyleConfig('SplitPage', props)

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const context = useDisclosure({
    defaultIsOpen,
    onClose,
    onOpen,
    isOpen,
  })

  const containerStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    ...styles.container,
  }

  const pageStyles: SystemStyleObject = isMobile
    ? {}
    : {
        borderRightWidth: 1,
        width,
        maxW,
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

  return (
    <SplitPageProvider value={context}>
      <chakra.main
        __css={containerStyles}
        className="saas-split-page__container"
      >
        <Page as="div" height="100%" sx={pageStyles} {...rest} />
        <MotionBox
          animate={!isMobile || context.isOpen ? 'enter' : 'exit'}
          variants={{
            enter: {
              right: 0,
              opacity: 1,
              transition: { ease: 'easeOut', duration: 0.2 },
            },
            exit: { right: '-100%', opacity: 0 },
          }}
          __css={contentStyles}
          className={'saas-split-page__content'}
        >
          {content}
        </MotionBox>
      </chakra.main>
    </SplitPageProvider>
  )
}
