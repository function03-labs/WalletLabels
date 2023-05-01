import * as React from 'react'
import {
  chakra,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useMultiStyleConfig,
  SystemStyleObject,
  createStylesContext,
} from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'

import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'

const [StylesProvider, useStyles] = createStylesContext('SuiSection')

export const useSectionStyles = useStyles

export interface SectionProps
  extends Omit<HTMLChakraProps<'div'>, 'title'>,
    ThemingProps<'SuiSection'> {
  isLoading?: boolean
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = (props) => {
  const { isLoading, children, ...rest } = props

  let content
  if (isLoading) {
    content = (
      <LoadingOverlay p={4}>
        <LoadingSpinner />
      </LoadingOverlay>
    )
  } else {
    content = children
  }

  return <SectionContainer {...rest}>{content}</SectionContainer>
}

Section.displayName = 'Section'

export interface SectionBodyProps extends HTMLChakraProps<'div'> {}

export const SectionBody: React.FC<SectionBodyProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const bodyStyles: SystemStyleObject = {
    flex: 1,
    minWidth: 0,
    ...styles.body,
  }

  return (
    <chakra.div
      {...rest}
      __css={bodyStyles}
      className={cx('sui-section__body', props.className)}
    >
      {children}
    </chakra.div>
  )
}

SectionBody.displayName = 'SectionBody'

export const SectionContainer: React.FC<SectionProps> = (props) => {
  const { children, variant, ...rest } = props
  const styles = useMultiStyleConfig('SuiSection', props)

  const containerProps = omitThemingProps(rest)

  const containerStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: variant === 'annotated' ? 'row' : 'column',
    maxWidth: '100%',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div
        {...containerProps}
        __css={containerStyles}
        className={cx('sui-section', props.className)}
      >
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

SectionContainer.displayName = 'SectionContainer'

export interface SectionHeaderProps
  extends Omit<HTMLChakraProps<'div'>, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  const { title, description, children, ...rest } = props
  const styles = useStyles()

  const headerStyles: SystemStyleObject = {
    flexShrink: 0,
    ...styles.header,
  }

  return (
    <chakra.div
      {...rest}
      __css={headerStyles}
      className={cx('sui-section__header', props.className)}
    >
      {typeof title === 'string' ? <SectionTitle>{title}</SectionTitle> : title}
      {typeof description === 'string' ? (
        <SectionDescription>{description}</SectionDescription>
      ) : (
        description
      )}
      {children}
    </chakra.div>
  )
}

SectionHeader.displayName = 'SectionHeader'

export const SectionTitle: React.FC<HTMLChakraProps<'h3'>> = (props) => {
  const styles = useStyles()

  return <chakra.h3 {...props} __css={styles.title} />
}

SectionTitle.displayName = 'SectionTitle'

export const SectionDescription: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()

  return <chakra.div {...props} __css={styles.description} />
}

SectionDescription.displayName = 'SectionDescription'
