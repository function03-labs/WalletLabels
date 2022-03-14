import {
  Flex,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
  omitThemingProps,
} from '@chakra-ui/react'

export interface AppShellProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'AppShell'> {
  navbar?: React.ReactNode
  sidebar?: React.ReactNode
  hideSidebar?: boolean
  footer?: React.ReactNode
  children: React.ReactNode
}

export function AppShell(props: AppShellProps) {
  const styles = useMultiStyleConfig('AppShell', props)

  const { navbar, sidebar, hideSidebar, footer, children, ...containerProps } =
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
        {footer}
      </Flex>
    </StylesProvider>
  )
}
