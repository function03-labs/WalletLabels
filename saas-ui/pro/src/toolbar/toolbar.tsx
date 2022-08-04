import * as React from 'react'

import {
  chakra,
  forwardRef,
  omitThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
  ThemingProps,
  Tooltip,
  TooltipProps,
  MenuOptionGroupProps,
  useMenuOptionGroup,
  useButtonGroup,
  SystemStyleObject,
  createStylesContext,
} from '@chakra-ui/react'

import { cx, __DEV__ } from '@chakra-ui/utils'

import {
  Button,
  ButtonProps,
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
  Divider,
} from '@saas-ui/react'
import { useDefaultProps } from '../theme-tools/use-default-props'

const [StylesProvider, useStyles] = createStylesContext('Toolbar')

export interface ToolbarProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'Toolbar'> {}

export const Toolbar = forwardRef<ToolbarProps, 'div'>((props, ref) => {
  const { children, className, variant, size, ...rest } = props
  const styles = useMultiStyleConfig('Toolbar', props)
  const defaultProps = useDefaultProps('Toolbar')
  const toolbarProps = omitThemingProps(rest)

  const containerStyles: SystemStyleObject = {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div
        as={ButtonGroup}
        role="toolbar"
        {...toolbarProps}
        variant={variant || defaultProps.variant}
        size={size || defaultProps.size}
        ref={ref}
        __css={containerStyles}
        className={cx('saas-toolbar', className)}
      >
        {children}
      </chakra.div>
    </StylesProvider>
  )
})

if (__DEV__) {
  Toolbar.displayName = 'Toolbar'
}

export interface ToolbarButtonProps extends ButtonProps {
  label: string
  icon?: React.ReactElement
  tooltipProps?: Omit<TooltipProps, 'children'>
}

export const ToolbarButton = forwardRef<ToolbarButtonProps, 'button'>(
  (props, ref) => {
    const { label, icon, tooltipProps, ...buttonProps } = props

    let button
    if (icon) {
      button = (
        <IconButton ref={ref} icon={icon} {...buttonProps} aria-label={label} />
      )
    } else {
      button = (
        <Button ref={ref} {...buttonProps}>
          {label}
        </Button>
      )
    }

    if (icon || tooltipProps) {
      return (
        <Tooltip
          label={label}
          closeOnClick={false}
          openDelay={400}
          {...tooltipProps}
        >
          {button}
        </Tooltip>
      )
    }

    return button
  },
)

export const ToolbarDivider: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()

  const dividerStyles: SystemStyleObject = {
    flexShrink: 0,
    height: '100%',
    ...styles.divider,
  }

  return (
    <chakra.div
      {...props}
      __css={dividerStyles}
      className={cx('saas-toolbar__divider', props.className)}
    >
      <Divider orientation="vertical" />
    </chakra.div>
  )
}

if (__DEV__) {
  ToolbarDivider.displayName = 'ToolbarDivider'
}

export const ToolbarGroup: React.FC<ButtonGroupProps> = (props) => {
  const groupProps = useButtonGroup()
  return (
    <ButtonGroup
      {...groupProps}
      {...props}
      className={cx('saas-toolbar__group', props.className)}
    />
  )
}

if (__DEV__) {
  ToolbarGroup.displayName = 'ToolbarGroup'
}

export interface ToolbarToggleGroupProps
  extends Omit<ButtonGroupProps, 'value' | 'defaultValue' | 'onChange'>,
    MenuOptionGroupProps {}

export const ToolbarToggleGroup: React.FC<ToolbarToggleGroupProps> = (
  props,
) => {
  const groupProps = useMenuOptionGroup(props)
  const { onChange, ...rest } = props
  return (
    <ToolbarGroup
      {...rest}
      {...groupProps}
      className={cx('saas-toolbar__toggle-group', props.className)}
    />
  )
}

if (__DEV__) {
  ToolbarToggleGroup.displayName = 'ToolbarToggleGroup'
}

export interface ToolbarToggleButtonProps
  extends Omit<ToolbarButtonProps, 'type'> {
  value?: string
  isChecked?: boolean
  type?: 'radio' | 'checkbox'
}

export const ToolbarToggleButton = forwardRef<
  ToolbarToggleButtonProps,
  'button'
>((props, ref) => {
  const { type = 'radio', isChecked, ...rest } = props

  const { colorScheme, variant } = useButtonGroup()
  return (
    <ToolbarButton
      ref={ref}
      aria-checked={isChecked}
      colorScheme={isChecked ? 'primary' : colorScheme}
      variant={isChecked ? 'subtle' : variant}
      {...rest}
      className={cx('saas-toolbar__toggle-button', props.className)}
    />
  )
})

ToolbarToggleButton.id = 'MenuItemOption' // this allows us to use `useMenuOptionGroup` for toggle management.

if (__DEV__) {
  ToolbarToggleButton.displayName = 'ToolbarToggleButton'
}
