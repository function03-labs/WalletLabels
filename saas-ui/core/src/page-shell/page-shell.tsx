import {
  Flex,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
  omitThemingProps,
} from '@chakra-ui/react'

export interface PageShellProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'PageShell'> {
  navbar?: React.ReactNode
  sidebar?: React.ReactNode
  hideSidebar?: boolean
  children: React.ReactNode
}

export function PageShell(props: PageShellProps) {
  const styles = useMultiStyleConfig('PageShell', props)

  const { navbar, sidebar, hideSidebar, children, ...containerProps } =
    omitThemingProps(props)

  return (
    <StylesProvider value={styles}>
      <Flex direction="column" {...containerProps}>
        {navbar}
        <Flex flex="1">
          {sidebar && !hideSidebar && sidebar}
          <Flex flex="1" direction="column">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </StylesProvider>
  )
}
