import {
  chakra,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useMultiStyleConfig,
  useStyles,
} from '@chakra-ui/react'

import { Loader } from '@saas-ui/react'

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
        <SectionHeading title={title} description={description} />
      )}
      <SectionBody>{content}</SectionBody>
    </SectionContainer>
  )
}

export interface SectionBodyProps extends HTMLChakraProps<'div'> {}

export const SectionBody: React.FC<SectionBodyProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const bodyStyles = {
    flex: 1,
    minWidth: 0,
    ...styles.body,
  }

  return (
    <chakra.div __css={bodyStyles} {...rest}>
      {children}
    </chakra.div>
  )
}

export const SectionContainer: React.FC<SectionProps> = (props) => {
  const { children, title, description, isAnnotated, variant, ...rest } = props
  const styles = useMultiStyleConfig('Section', props)

  const containerProps = omitThemingProps(rest)

  const containerStyles = {
    display: 'flex',
    flexDirection: variant === 'annotated' ? 'row' : 'column',
    maxWidth: '100%',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div __css={containerStyles} {...containerProps}>
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

export interface SectionHeadingProps
  extends Omit<HTMLChakraProps<'div'>, 'title'> {
  title: React.ReactNode
  description: React.ReactNode
}

export const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
  const { title, description } = props

  const styles = useStyles()

  const headingStyles = {
    flexShrink: 0,
    ...styles.heading,
  }

  return (
    <chakra.div __css={headingStyles}>
      <chakra.h3 __css={styles.title} textStyle="h3">
        {title}
      </chakra.h3>
      {description && (
        <chakra.p __css={styles.description}>{description}</chakra.p>
      )}
    </chakra.div>
  )
}
