import * as React from 'react'

import {
  chakra,
  forwardRef,
  IconButton,
  Tooltip,
  TooltipProps,
  Divider,
  ButtonGroup,
  omitThemingProps,
  useMultiStyleConfig,
  useStyles,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react'

import { cx, __DEV__ } from '@chakra-ui/utils'

import { Button, ButtonProps } from '@saas-ui/react'

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
          closeOnClick={true}
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

export const ToolbarDivider: React.FC = () => {
  const styles = useStyles()

  const dividerStyles = {
    px: 2,
    flexShrink: 0,
    height: '100%',
    ...styles.divider,
  }

  return (
    <chakra.div __css={dividerStyles}>
      <Divider orientation="vertical" />
    </chakra.div>
  )
}

export interface ToolbarProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'Toolbar'> {}

export const Toolbar = forwardRef<ToolbarProps, 'div'>((props, ref) => {
  const { children, className, variant, ...rest } = props
  const styles = useMultiStyleConfig('Toolbar', props)

  const toolbarProps = omitThemingProps(rest)

  const containerStyles = {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div
        role="toolbar"
        {...toolbarProps}
        ref={ref}
        __css={containerStyles}
        className={cx('saas-toolbar', className)}
      >
        <ButtonGroup width="100%" justifyContent="flex-end" variant={variant}>
          {children}
        </ButtonGroup>
      </chakra.div>
    </StylesProvider>
  )
})

Toolbar.defaultProps = {
  variant: 'ghost',
}

if (__DEV__) {
  Toolbar.displayName = 'Toolbar'
}
