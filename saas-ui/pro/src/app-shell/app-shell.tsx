import * as React from 'react'

import {
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
}

export const AppShell: React.FC<AppShellProps> = (props: AppShellProps) => {
  const styles = useMultiStyleConfig('AppShell', props)

  const { navbar, sidebar, hideSidebar, footer, children, ...containerProps } =
    omitThemingProps(props)

  const containerStyles = {
    flexDirection: 'column',
    ...styles.container,
  }

  const innerStyles = {
    flex: 1,
    minHeight: 0, // make sure child flex divs get correct height.
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
        <Flex sx={innerStyles} className="saas-app-shell__inner">
          {sidebar && !hideSidebar && sidebar}
          <Flex sx={mainStyles} className="saas-app-shell__main">
            {children}
          </Flex>
        </Flex>
        {footer}
      </Flex>
    </StylesProvider>
  )
}

if (__DEV__) {
  AppShell.displayName = 'AppShell'
}
