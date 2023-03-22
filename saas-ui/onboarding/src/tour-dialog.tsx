import * as React from 'react'

import {
  forwardRef,
  Popover,
  useTheme,
  Button,
  ButtonProps,
  ButtonGroup,
  ButtonGroupProps,
  PopoverTrigger as TourDialogTrigger,
  PopoverAnchor as TourDialogAnchor,
  PopoverContent as TourDialogContent,
  PopoverArrow as TourDialogArrow,
  PopoverCloseButton as TourDialogCloseButton,
  PopoverHeader as TourDialogHeader,
  PopoverBody as TourDialogBody,
  PopoverFooter as TourDialogFooter,
  usePopoverContext,
  PopoverProps,
} from '@chakra-ui/react'

import { __DEV__ } from '@chakra-ui/utils'

import { getChildOfType } from '@saas-ui/react-utils'

import {
  useTourDialog,
  useTourDialogContext,
  TourDialogOptions,
  TourDialogContextProvider,
} from './use-tour-dialog'

import defaultStyleConfig from './tour-dialog.styles'
import { useTourContext } from './use-tour'

export interface TourDialogProps extends TourDialogContainerProps {
  /**
   * Hide the arrow
   */
  hideArrow?: boolean
  /**
   * The Spotlight target when used in a Tour.
   */
  ['data-target']?: string

  children: React.ReactNode
}

export const TourDialog = forwardRef<
  TourDialogProps,
  typeof TourDialogContainer
>((props, ref) => {
  const { children, hideArrow } = props

  const triggerComponent = getChildOfType(children, TourDialogTrigger)

  const _children = (
    React.Children.toArray(children) as React.ReactElement[]
  ).filter((child) => {
    return child.type !== TourDialogTrigger
  })

  const target = props['data-target']

  return (
    <TourDialogContainer {...props}>
      {triggerComponent}
      {target && <TourDialogTarget />}
      <TourDialogContent ref={ref}>
        {!hideArrow && <TourDialogArrow />}
        {_children}
      </TourDialogContent>
    </TourDialogContainer>
  )
})

if (__DEV__) {
  TourDialog.displayName = 'TourDialog'
}

export interface TourDialogContainerProps
  extends PopoverProps,
    TourDialogOptions {}

export const TourDialogContainer: React.FC<TourDialogContainerProps> = (
  props,
) => {
  const { children, ...rest } = props

  const context = useTourDialog(props)

  const { initialFocusRef, isOpen, onClose } = context

  const theme = useTheme()

  const styleConfig = theme.components?.TourDialog || defaultStyleConfig

  return (
    <TourDialogContextProvider value={context}>
      <Popover
        initialFocusRef={initialFocusRef}
        styleConfig={styleConfig}
        isOpen={isOpen}
        onClose={onClose}
        closeOnBlur={false}
        {...rest}
      >
        {children}
      </Popover>
    </TourDialogContextProvider>
  )
}

if (__DEV__) {
  TourDialogContainer.displayName = 'TourDialogContainer'
}

export interface TourDialogActionsProps extends ButtonGroupProps {
  primaryActionProps?: ButtonProps
  secondaryActionProps?: ButtonProps
}

export const TourDialogActions: React.FC<TourDialogActionsProps> = (props) => {
  return (
    <ButtonGroup
      size="sm"
      variant="ghost"
      flex="1"
      justifyContent="flex-end"
      {...props}
    />
  )
}

if (__DEV__) {
  TourDialogActions.displayName = 'TourDialogActions'
}

export const TourDialogPrimaryAction: React.FC<ButtonProps> = (props) => {
  const { getPrimaryActionProps } = useTourDialogContext()

  return <Button {...getPrimaryActionProps({ variant: 'subtle', ...props })} />
}

if (__DEV__) {
  TourDialogPrimaryAction.displayName = 'TourDialogPrimaryAction'
}

export const TourDialogSecondaryAction: React.FC<ButtonProps> = (props) => {
  const { getSecondaryActionProps } = useTourDialogContext()

  return <Button {...getSecondaryActionProps(props)} />
}

if (__DEV__) {
  TourDialogSecondaryAction.displayName = 'TourDialogSecondaryAction'
}

export const TourDialogTarget = () => {
  const { getAnchorProps } = usePopoverContext()
  const context = useTourContext()

  if (!context) {
    return null
  }

  const { targetElement } = context

  const { ref } = getAnchorProps()

  React.useEffect(() => {
    if (typeof ref === 'function') {
      ref?.(targetElement)
    }
  }, [targetElement])

  return null
}

export {
  TourDialogTrigger,
  TourDialogAnchor,
  TourDialogArrow,
  TourDialogCloseButton,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
}
