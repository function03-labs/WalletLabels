import * as React from 'react'

import {
  chakra,
  HTMLChakraProps,
  ThemingProps,
  StylesProvider,
  omitThemingProps,
  useStyles,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { ErrorBoundary } from '@saas-ui/app'
import { Loading } from '@saas-ui/react'

import { ErrorPage } from './error-page'

export interface PageOptions {
  /**
   * The page title, can be a string or Component
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
  errorComponent?: React.ReactNode
}

export const PageTitle: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()
  return <chakra.div __css={styles.title} as="h2" {...props} />
}

export const PageDescription: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()
  return <chakra.div __css={styles.description} {...props} />
}

export const PageHeader: React.FC<HTMLChakraProps<'header'>> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  return (
    <chakra.header __css={styles.headerContainer} {...rest}>
      <chakra.div __css={styles.header}>{children}</chakra.div>
    </chakra.header>
  )
}

interface PageBodyProps extends HTMLChakraProps<'div'> {
  fullWidth?: boolean
}

export const PageBody: React.FC<PageBodyProps> = (props) => {
  const { fullWidth, children } = props

  let innerWidth = 'container.xl'
  if (fullWidth) {
    innerWidth = '100%'
  }

  const styles = useStyles()

  return (
    <chakra.div __css={styles.body}>
      <chakra.div maxW={innerWidth}>{children}</chakra.div>
    </chakra.div>
  )
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
      <chakra.main {...containerProps} __css={styles.container}>
        {children}
      </chakra.main>
    </StylesProvider>
  )
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
    errorComponent,
    children,
    ...rest
  } = props

  let content
  if (isLoading) {
    content = skeleton || <Loading />
  } else {
    content = children
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
        <PageHeader>
          {nav}
          <chakra.div>
            {typeof title === 'string' ? <PageTitle>{title}</PageTitle> : title}
            {typeof description === 'string' ? (
              <PageDescription>{description}</PageDescription>
            ) : (
              description
            )}
          </chakra.div>
          {toolbar}
          {tabbar}
        </PageHeader>
        <PageBody fullWidth={fullWidth}>{content}</PageBody>
      </PageContainer>
    </ErrorBoundary>
  )
}
