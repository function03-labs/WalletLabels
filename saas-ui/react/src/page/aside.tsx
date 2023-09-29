import * as React from 'react'

import {
  chakra,
  ChakraProps,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useMultiStyleConfig,
  SystemStyleObject,
  createStylesContext,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { LoadingOverlay, LoadingSpinner, ErrorBoundary } from '@saas-ui/react'

import { MotionBox } from '../transitions'

import { ResizeHandle, ResizeOptions, useResize } from '../resize'
import { HTMLMotionProps } from 'framer-motion'

const [StylesProvider, useStyles] = createStylesContext('SuiAside')

export interface AsideOptions {
  children?: React.ReactNode
  isLoading?: boolean
  skeleton?: React.ReactNode
  errorComponent?: React.ReactNode
}

export const AsideTitle: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()
  return <chakra.div __css={styles.title} as="h3" {...props} />
}

AsideTitle.displayName = 'AsideTitle'

export const AsideHeader: React.FC<HTMLChakraProps<'header'>> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  return (
    <chakra.header
      __css={styles.header}
      {...rest}
      className={cx('sui-aside__header', props.className)}
    >
      {children}
    </chakra.header>
  )
}

AsideHeader.displayName = 'AsideHeader'

interface AsideBodyProps extends HTMLChakraProps<'div'> {}

export const AsideBody: React.FC<AsideBodyProps> = (props) => {
  const { children } = props

  const styles = useStyles()

  return (
    <chakra.div
      __css={styles.body}
      className={cx('sui-aside__body', props.className)}
    >
      {children}
    </chakra.div>
  )
}

AsideBody.displayName = 'AsideBody'

export interface AsideContainerProps
  extends Omit<
      HTMLMotionProps<'div'>,
      'color' | 'transition' | 'onResize' | 'children'
    >,
    Omit<ChakraProps, 'css'>,
    Omit<ResizeOptions, 'position'>,
    ThemingProps<'SuiAside'> {
  isOpen?: boolean
  children?: React.ReactNode
}

export const AsideContainer: React.FC<AsideContainerProps> = (props) => {
  const {
    children,
    isOpen,
    isResizable,
    onResize,
    defaultWidth,
    ...containerProps
  } = omitThemingProps(props)

  const styles = useMultiStyleConfig('SuiAside', props) as Record<
    string,
    SystemStyleObject
  >

  const resize = useResize({
    defaultWidth,
    isResizable,
    handlePosition: 'left',
    onResize,
  })

  const innerStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }

  return (
    <StylesProvider value={styles}>
      <MotionBox
        animate={isOpen ? 'enter' : 'exit'}
        variants={{
          enter: {
            marginRight: 0,
            transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
          },
          exit: { marginRight: -resize.width },
        }}
        __css={{
          ...styles.container,
        }}
        {...containerProps}
        className={cx('sui-aside', props.className)}
        {...resize.getContainerProps()}
      >
        <chakra.aside __css={innerStyles}>{children}</chakra.aside>
        {isResizable && <ResizeHandle {...resize.getHandleProps()} />}
      </MotionBox>
    </StylesProvider>
  )
}

AsideContainer.displayName = 'AsideContainer'

export interface AsideProps
  extends AsideOptions,
    Omit<AsideContainerProps, 'title' | 'children'> {
  children?: React.ReactNode
}

export const Aside: React.FC<AsideProps> = (props) => {
  const { isLoading, skeleton, errorComponent, children, ...rest } = props

  let content
  if (isLoading) {
    content = skeleton || (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    )
  } else {
    content = children
  }

  return (
    <AsideContainer {...rest}>
      <ErrorBoundary fallback={errorComponent}>{content}</ErrorBoundary>
    </AsideContainer>
  )
}

Aside.displayName = 'Aside'
