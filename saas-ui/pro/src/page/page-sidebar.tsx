import * as React from 'react'

import {
  chakra,
  ChakraProps,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useMultiStyleConfig,
  SystemProps,
  SystemStyleObject,
  createStylesContext,
} from '@chakra-ui/react'
import { cx, __DEV__ } from '@chakra-ui/utils'
import { Loader } from '@saas-ui/react'
import { getChildOfType } from '@saas-ui/react-utils'

import { ErrorBoundary } from '../app/error-boundary'

import { MotionBox } from '../transitions'

import { ResizeHandle, ResizeOptions, useResize } from '../resize'
import { HTMLMotionProps } from 'framer-motion'

const [StylesProvider, useStyles] = createStylesContext('PageSidebar')

export interface PageSidebarOptions {
  /**
   * The page title
   */
  title?: React.ReactNode
  children?: React.ReactNode
  isLoading?: boolean
  skeleton?: React.ReactNode
  fullWidth?: boolean
  contentWidth?: SystemProps['maxW']
  errorComponent?: React.ReactNode
}

export const PageSidebarTitle: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()
  return <chakra.div __css={styles.title} as="h3" {...props} />
}

if (__DEV__) {
  PageSidebarTitle.displayName = 'PageSidebarTitle'
}

export const PageSidebarHeader: React.FC<HTMLChakraProps<'header'>> = (
  props,
) => {
  const { children, ...rest } = props

  const styles = useStyles()

  return (
    <chakra.header
      __css={styles.headerContainer}
      {...rest}
      className={cx('saas-page-sidebar__header', props.className)}
    >
      <chakra.div __css={styles.header}>{children}</chakra.div>
    </chakra.header>
  )
}

if (__DEV__) {
  PageSidebarHeader.displayName = 'PageSidebarHeader'
}

interface PageSidebarBodyProps extends HTMLChakraProps<'div'> {}

export const PageSidebarBody: React.FC<PageSidebarBodyProps> = (props) => {
  const { children } = props

  const styles = useStyles()

  return (
    <chakra.div
      __css={styles.body}
      className={cx('saas-page-sidebar__body', props.className)}
    >
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  PageSidebarBody.displayName = 'PageSidebarBody'
}

export interface PageSidebarContainerProps
  extends Omit<HTMLMotionProps<'div'>, 'color' | 'transition'>,
    Omit<ChakraProps, 'css'>,
    Omit<ResizeOptions, 'position'>,
    ThemingProps<'PageSidebar'> {
  isOpen?: boolean
}

export const PageSidebarContainer: React.FC<PageSidebarContainerProps> = (
  props,
) => {
  const { children, isOpen, isResizable, defaultWidth, ...containerProps } =
    omitThemingProps(props)

  const styles = useMultiStyleConfig('PageSidebar', props) as Record<
    string,
    SystemStyleObject
  >

  const resize = useResize({
    defaultWidth,
    isResizable,
    handlePosition: 'left',
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
            right: 0,
            transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
          },
          exit: { position: 'absolute', right: '-100%' },
        }}
        __css={{
          ...styles.container,
        }}
        {...containerProps}
        className={cx('saas-page-sidebar', props.className)}
        {...resize.getContainerProps()}
      >
        <chakra.div __css={innerStyles}>{children}</chakra.div>
        {isResizable && <ResizeHandle {...resize.getHandleProps()} />}
      </MotionBox>
    </StylesProvider>
  )
}

if (__DEV__) {
  PageSidebarContainer.displayName = 'PageSidebarContainer'
}

export interface PageSidebarProps
  extends PageSidebarOptions,
    Omit<PageSidebarContainerProps, 'title'> {}

export const PageSidebar: React.FC<PageSidebarProps> = (props) => {
  const { title, isLoading, skeleton, errorComponent, children, ...rest } =
    props

  let content
  if (isLoading) {
    content = skeleton || <Loader />
  } else {
    content = children
  }

  const headerComponent = getChildOfType(content, PageSidebarHeader)

  if (!headerComponent) {
    content = (
      <PageSidebarHeader>
        {typeof title === 'string' ? (
          <PageSidebarTitle>{title}</PageSidebarTitle>
        ) : (
          title
        )}
      </PageSidebarHeader>
    )
  }

  const bodyComponent = getChildOfType(content, PageSidebarBody)

  if (!bodyComponent) {
    content = <PageSidebarBody>{content}</PageSidebarBody>
  }

  return (
    <ErrorBoundary errorComponent={errorComponent}>
      <PageSidebarContainer {...rest}>{content}</PageSidebarContainer>
    </ErrorBoundary>
  )
}

if (__DEV__) {
  PageSidebar.displayName = 'PageSidebar'
}
