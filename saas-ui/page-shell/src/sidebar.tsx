import * as React from 'react'

import {
  chakra,
  forwardRef,
  StackProps,
  Collapse,
  useStyles,
  StylesProvider,
  omitThemingProps,
  HTMLChakraProps,
  ThemingProps,
  SystemProps,
  useMultiStyleConfig,
  useStyleConfig,
} from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'

import { Menu, MenuButton, MenuList } from '@saas-ui/menu'
import { useLink, useActivePath } from '@saas-ui/provider'
import {
  CollapseProvider,
  useCollapseContext,
  useCollapse,
} from '@saas-ui/collapse'

export {
  MenuGroup as SidebarMenuGroup,
  MenuDivider as SidebarMenuDivider,
} from '@chakra-ui/menu'

import { ChevronDown, ChevronRight } from './icons'

export interface SidebarProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'Sidebar'> {
  spacing?: SystemProps['margin']
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const styles = useMultiStyleConfig('Sidebar', props)

  const { spacing = 4, children, ...containerProps } = omitThemingProps(props)

  const containerStyles = {
    '& > *:not(style) ~ *:not(style)': { marginTop: spacing },
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div
        __css={{
          ...containerStyles,
          ...styles.container,
        }}
        {...containerProps}
      >
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

export interface SidebarDividerProps extends HTMLChakraProps<'hr'> {}

export const SidebarDivider: React.FC<SidebarDividerProps> = (props) => {
  const { className, ...rest } = props
  const styles = useStyles()
  return (
    <chakra.hr
      role="separator"
      aria-orientation="horizontal"
      {...rest}
      __css={styles.divider}
    />
  )
}

export const SidebarOverflow: React.FC<HTMLChakraProps<'div'>> = (props) => {
  return (
    <chakra.div
      __css={{
        overflow: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      {...props}
    />
  )
}

export const SidebarNav: React.FC<StackProps> = (props) => {
  const styles = useStyles()

  const { children, spacing, direction, ...rest } = props

  return (
    <chakra.nav
      __css={styles.nav}
      flexDirection={direction}
      {...rest}
      role="navigation"
    >
      {children}
    </chakra.nav>
  )
}

SidebarNav.defaultProps = {
  spacing: 2,
  direction: 'column',
}

export interface SidebarNavGroupTitleProps extends HTMLChakraProps<'div'> {
  leftIcon?: React.ReactElement
  isCollapsible?: boolean
}

export const SidebarNavGroupTitle: React.FC<SidebarNavGroupTitleProps> = (
  props,
) => {
  const { leftIcon, children, ...rest } = props
  const styles = useStyles()

  const { getToggleProps, isOpen, isCollapsible } = useCollapseContext()

  const iconStyles = { display: 'inline-flex', marginEnd: 2 }

  let collapseIcon
  if (isCollapsible) {
    collapseIcon = isOpen ? <ChevronDown /> : <ChevronRight />
  }

  return (
    <chakra.div {...getToggleProps(rest)} __css={styles.groupTitle}>
      {leftIcon && (
        <chakra.span __css={{ ...iconStyles, ...styles.groupIcon }}>
          {leftIcon}
        </chakra.span>
      )}
      <chakra.span flex="1">
        {typeof children === 'function' ? children({ isOpen }) : children}{' '}
      </chakra.span>
      {collapseIcon}
    </chakra.div>
  )
}

export interface SidebarNavGroupProps
  extends Omit<HTMLChakraProps<'div'>, 'title'> {
  title?: React.ReactNode
  isCollapsible?: boolean
  defaultIsOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  icon?: React.ReactElement
}

export const SidebarNavGroup: React.FC<SidebarNavGroupProps> = (props) => {
  const {
    title,
    icon,
    isCollapsible,
    defaultIsOpen,
    onOpen,
    onClose,
    children,
    ...rest
  } = props
  const styles = useStyles()

  const collapse = useCollapse(props)

  const { getCollapseProps } = collapse

  const header = title && (
    <SidebarNavGroupTitle leftIcon={icon}>{title}</SidebarNavGroupTitle>
  )

  let content = <chakra.div>{children}</chakra.div>

  if (isCollapsible) {
    content = <Collapse {...getCollapseProps()}>{content}</Collapse>
  }

  return (
    <CollapseProvider value={collapse}>
      <chakra.div
        __css={{
          userSelect: 'none',
          ...styles.group,
        }}
        {...rest}
        role="group"
      >
        {header}
        {content}
      </chakra.div>
    </CollapseProvider>
  )
}

SidebarNavGroup.defaultProps = {
  defaultIsOpen: true,
  isCollapsible: false,
}

export interface SidebarLinkLabelProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'NavLink'> {}

export const SidebarLinkLabel = forwardRef<SidebarLinkLabelProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()
    return (
      <chakra.div ref={ref} __css={styles.label} {...props}>
        {children}
      </chakra.div>
    )
  },
)

const SidebarLinkIcon: React.FC<HTMLChakraProps<'span'>> = (props) => {
  const styles = useStyles()

  const { className, children, ...rest } = props

  const child = React.Children.only(children)

  const clone = React.isValidElement(child)
    ? React.cloneElement(child, {
        focusable: 'false',
        'aria-hidden': true,
      })
    : null

  return (
    <chakra.span
      {...rest}
      __css={{
        flexShrink: 0,
        ...styles.icon,
      }}
    >
      {clone}
    </chakra.span>
  )
}

export interface SidebarLinkProps
  extends HTMLChakraProps<'a'>,
    ThemingProps<'SidebarLink'> {
  href?: string
  label: string
  icon?: React.ReactElement
  inset?: SystemProps['paddingLeft']
}

export const SidebarLink = forwardRef<SidebarLinkProps, 'a'>((props, ref) => {
  const {
    href = '#',
    label,
    icon,
    inset,
    className,
    ...rest
  } = omitThemingProps(props)
  const RouterLink = useLink()
  const isActive = useActivePath(href)

  const styles = useMultiStyleConfig('SidebarLink', { isActive, ...props })

  let link = (
    <chakra.a
      ref={ref}
      __css={styles.link}
      href={href}
      className={cx('sui-sidebar-link', className)}
      {...rest}
    >
      <chakra.span
        __css={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          pl: inset,
        }}
      >
        {icon && <SidebarLinkIcon>{icon}</SidebarLinkIcon>}
        <SidebarLinkLabel>{label}</SidebarLinkLabel>
      </chakra.span>
    </chakra.a>
  )

  if (href && href !== '#') {
    link = <RouterLink href={href}>{link}</RouterLink>
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div __css={styles.container}>{link}</chakra.div>
    </StylesProvider>
  )
})

export interface SidebarMenuButton
  extends HTMLChakraProps<'button'>,
    ThemingProps<'SidebarMenuButton'> {
  icon?: React.ReactNode
  label?: React.ReactNode
}

const SidebarMenuButton = forwardRef<SidebarMenuButton, 'button'>(
  (props, ref) => {
    const { label, icon, ...rest } = props
    const styles = useStyleConfig('SidebarMenuButton', props)

    const buttonProps = omitThemingProps(rest)

    return (
      <chakra.button ref={ref} __css={styles} {...buttonProps}>
        {icon}
        {label}
      </chakra.button>
    )
  },
)

export type SidebarMenuProps = {
  label?: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export const SidebarMenu = forwardRef<SidebarMenuProps, typeof MenuButton>(
  (props, ref) => {
    const { label, icon, children, ...rest } = props
    return (
      <Menu {...rest}>
        <MenuButton
          as={SidebarMenuButton}
          isTruncated
          icon={icon}
          label={label}
        />
        <MenuList zIndex="dropdown" ref={ref}>
          {children}
        </MenuList>
      </Menu>
    )
  },
)
