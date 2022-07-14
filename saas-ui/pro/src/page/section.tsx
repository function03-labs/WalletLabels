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

import { cx, __DEV__ } from '@chakra-ui/utils'

import { Loader } from '@saas-ui/react'

const [StylesProvider, useStyles] = createStylesContext('Section')

export interface SectionProps
  extends Omit<HTMLChakraProps<'div'>, 'title'>,
    ThemingProps<'Section'> {
  title?: React.ReactNode
  description?: React.ReactNode
  isAnnotated?: boolean
  isLoading?: boolean
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = (props) => {
  const { title, description, isAnnotated, isLoading, children, ...rest } =
    props

  const showHeading = title || description || isAnnotated

  const variant = isAnnotated ? 'annotated' : props.variant

  let content
  if (isLoading) {
    content = <Loader p={4} />
  } else {
    content = children
  }

  return (
    <SectionContainer {...rest} variant={variant}>
      {showHeading && (
        <SectionHeading>
          {title && <SectionTitle>{title}</SectionTitle>}
          {description && (
            <SectionDescription>{description}</SectionDescription>
          )}
        </SectionHeading>
      )}
      <SectionBody>{content}</SectionBody>
    </SectionContainer>
  )
}

if (__DEV__) {
  Section.displayName = 'Section'
}

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
      className={cx('saas-section__body', props.className)}
    >
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  SectionBody.displayName = 'SectionBody'
}

export const SectionContainer: React.FC<SectionProps> = (props) => {
  const { children, title, description, isAnnotated, variant, ...rest } = props
  const styles = useMultiStyleConfig('Section', props) as Record<
    string,
    SystemStyleObject
  >

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
        className={cx('saas-section', props.className)}
      >
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

if (__DEV__) {
  SectionContainer.displayName = 'SectionContainer'
}

export const SectionHeading: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()

  const headingStyles: SystemStyleObject = {
    flexShrink: 0,
    ...styles.heading,
  }

  return (
    <chakra.div
      {...props}
      __css={headingStyles}
      className={cx('saas-section__heading', props.className)}
    />
  )
}

if (__DEV__) {
  SectionHeading.displayName = 'SectionHeading'
}

export const SectionTitle: React.FC<HTMLChakraProps<'h3'>> = (props) => {
  const styles = useStyles()

  return <chakra.h3 {...props} __css={styles.title} />
}

if (__DEV__) {
  SectionTitle.displayName = 'SectionTitle'
}

export const SectionDescription: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()

  return <chakra.div {...props} __css={styles.description} />
}

if (__DEV__) {
  SectionDescription.displayName = 'SectionDescription'
}
