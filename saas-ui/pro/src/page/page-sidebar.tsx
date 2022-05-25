import * as React from 'react'

import {
  chakra,
  HTMLChakraProps,
  ThemingProps,
  StylesProvider,
  omitThemingProps,
  useStyles,
  useMultiStyleConfig,
  SystemProps,
} from '@chakra-ui/system'
import { cx, __DEV__ } from '@chakra-ui/utils'
import { Loader } from '@saas-ui/react'
import { getChildOfType } from '@saas-ui/react-utils'

import { ErrorBoundary } from '../app/error-boundary'

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

interface PageSidebarContainerProps
  extends HTMLChakraProps<'main'>,
    ThemingProps<'PageSidebar'> {}

export const PageSidebarContainer: React.FC<PageSidebarContainerProps> = (
  props,
) => {
  const { children, ...containerProps } = omitThemingProps(props)

  const styles = useMultiStyleConfig('PageSidebar', props)

  return (
    <StylesProvider value={styles}>
      <chakra.div
        {...containerProps}
        __css={styles.container}
        className={cx('saas-page-sidebar', props.className)}
      >
        {children}
      </chakra.div>
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

        {toolbar}
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
