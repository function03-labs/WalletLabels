import * as React from 'react'

import {
  chakra,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
  omitThemingProps,
} from '@chakra-ui/system'

import { Flex } from '@chakra-ui/layout'

import { cx, __DEV__ } from '@chakra-ui/utils'

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

  const containerStyles = {
    flexDirection: 'column',
    ...styles.container,
  }

  const innerStyles = {
    flex: 1,
    ...styles.inner,
  }

  const mainStyles = {
    flex: 1,
    flexDirection: 'column',
    ...styles.main,
  }

  return (
    <StylesProvider value={styles}>
      <Flex
        {...containerProps}
        sx={containerStyles}
        className={cx('saas-app-shell', props.className)}
      >
        {navbar}
        <Flex sx={innerStyles}>
          {sidebar && !hideSidebar && sidebar}
          <Flex sx={mainStyles}>{children}</Flex>
        </Flex>
        {footer}
      </Flex>
    </StylesProvider>
  )
}
