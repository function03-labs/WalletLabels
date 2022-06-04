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
import { ErrorPage } from './error-page'

export interface PageOptions {
  /**
   * The page title
   */
  title?: React.ReactNode
  description?: React.ReactNode
  nav?: React.ReactNode
  toolbar?: React.ReactNode
  tabbar?: React.ReactNode
  children?: React.ReactNode
  isLoading?: boolean
  skeleton?: React.ReactNode
  fullWidth?: boolean
  contentWidth?: SystemProps['maxW']
  errorComponent?: React.ReactNode
}

export const PageTitle: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()
  return <chakra.div __css={styles.title} as="h2" {...props} />
}

if (__DEV__) {
  PageTitle.displayName = 'PageTitle'
}

export const PageDescription: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()
  return <chakra.div __css={styles.description} {...props} />
}

if (__DEV__) {
  PageDescription.displayName = 'PageDescription'
}

export interface PageHeaderProps
  extends Omit<HTMLChakraProps<'header'>, 'title'> {
  nav?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  toolbar?: React.ReactNode
  tabbar?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { children, nav, title, description, toolbar, tabbar, ...rest } = props

  const styles = useStyles()

  let heading
  if (title || description) {
    heading = (
      <chakra.div>
        {typeof title === 'string' ? <PageTitle>{title}</PageTitle> : title}
        {typeof description === 'string' ? (
          <PageDescription>{description}</PageDescription>
        ) : (
          description
        )}
      </chakra.div>
    )
  }

  let footer

  if (tabbar) {
    footer = <chakra.div __css={styles.headerFooter}>{tabbar}</chakra.div>
  }

  return (
    <chakra.header
      __css={styles.headerContainer}
      {...rest}
      className={cx('saas-page__header', props.className)}
    >
      <chakra.div __css={styles.header}>
        {nav}
        {heading}
        {toolbar}
      </chakra.div>
      {footer}
    </chakra.header>
  )
}

if (__DEV__) {
  PageHeader.displayName = 'PageHeader'
}

interface PageBodyProps extends HTMLChakraProps<'div'> {
  fullWidth?: boolean
  contentWidth?: SystemProps['maxW']
}

export const PageBody: React.FC<PageBodyProps> = (props) => {
  const { fullWidth, contentWidth = 'container.xl', children } = props

  let innerWidth = contentWidth
  if (fullWidth) {
    innerWidth = '100%'
  }

  const styles = useStyles()

  return (
    <chakra.div
      __css={styles.body}
      className={cx('saas-page__body', props.className)}
    >
      <chakra.div maxW={innerWidth}>{children}</chakra.div>
    </chakra.div>
  )
}

if (__DEV__) {
  PageBody.displayName = 'PageBody'
}

interface PageContainerProps
  extends HTMLChakraProps<'main'>,
    ThemingProps<'Page'> {
  fullWidth?: boolean
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
  const { children, fullWidth, ...containerProps } = omitThemingProps(props)

  const styles = useMultiStyleConfig('Page', props)

  return (
    <StylesProvider value={styles}>
      <chakra.main
        {...containerProps}
        __css={styles.container}
        className={cx('saas-page', props.className)}
      >
        {children}
      </chakra.main>
    </StylesProvider>
  )
}

if (__DEV__) {
  PageContainer.displayName = 'PageContainer'
}

export interface PageProps
  extends PageOptions,
    Omit<PageContainerProps, 'title'> {}

export const Page: React.FC<PageProps> = (props) => {
  const {
    title,
    description,
    nav,
    toolbar,
    tabbar,
    isLoading,
    skeleton,
    fullWidth,
    contentWidth,
    errorComponent,
    children,
    ...rest
  } = props

  let content
  if (isLoading) {
    content = skeleton || <Loader />
  } else {
    content = children
  }

  const bodyComponent = getChildOfType(content, PageBody)

  if (!bodyComponent) {
    content = (
      <PageBody fullWidth={fullWidth} contentWidth={contentWidth}>
        {content}
      </PageBody>
    )
  }

  return (
    <ErrorBoundary
      errorComponent={
        errorComponent || (
          <ErrorPage
            title="Something went wrong"
            description="We've been notified about the problem."
          />
        )
      }
    >
      <PageContainer fullWidth={fullWidth} {...rest}>
        <PageHeader
          nav={nav}
          title={title}
          description={description}
          toolbar={toolbar}
          tabbar={tabbar}
        />

        {content}
      </PageContainer>
    </ErrorBoundary>
  )
}

if (__DEV__) {
  Page.displayName = 'Page'
}
