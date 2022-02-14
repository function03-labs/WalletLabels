import * as React from 'react'

import {
  chakra,
  forwardRef,
  Box,
  IconButton,
  Tooltip,
  TooltipProps,
  Divider,
  ButtonGroup,
  Spacer,
  omitThemingProps,
  useStyles,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react'

import { useMultiStyleConfig } from '@saas-ui/system'

import { Button, ButtonProps } from '@saas-ui/button'

const styleConfig = {
  parts: ['toolbar', 'divider'],
  baseStyle: {
    container: { display: 'flex', flex: 1, justifyContent: 'flex-end' },
    divider: {
      px: 2,
      flexShrink: 0,
      height: '100%',
    },
  },
}

export interface ToolbarButtonProps extends ButtonProps {
  label: string
  icon?: React.ReactElement
  tooltipProps?: TooltipProps
}

export const ToolbarButton = forwardRef<ToolbarButtonProps, 'button'>(
  (props, ref) => {
    const { label, icon, tooltipProps, isDisabled, ...buttonProps } = props

    if (icon) {
      return (
        <Tooltip label={label} {...tooltipProps}>
          <IconButton
            ref={ref}
            icon={icon}
            {...buttonProps}
            aria-label={label}
          />
        </Tooltip>
      )
    }

    return (
      <Button ref={ref} {...buttonProps}>
        {label}
      </Button>
    )
  },
)

export const ToolbarDivider: React.FC = () => {
  const styles = useStyles()
  return (
    <chakra.div __css={styles.divider}>
      <Divider orientation="vertical" />
    </chakra.div>
  )
}

export interface ToolbarProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'Toolbar'> {}

export const Toolbar = forwardRef<ToolbarProps, 'div'>((props, ref) => {
  const { children, variant, ...rest } = props
  const styles = useMultiStyleConfig('Toolbar', props, {
    defaultStyleConfig: styleConfig,
  })

  const toolbarProps = omitThemingProps(rest)

  return (
    <StylesProvider value={styles}>
      <chakra.div
        ref={ref}
        role="toolbar"
        __css={styles.container}
        {...toolbarProps}
      >
        <ButtonGroup variant={variant}>{children}</ButtonGroup>
      </chakra.div>
    </StylesProvider>
  )
})

Toolbar.defaultProps = {
  variant: 'ghost',
}
