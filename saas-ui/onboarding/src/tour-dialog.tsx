import * as React from 'react'

import {
  chakra,
  forwardRef,
  Popover,
  useTheme,
  HTMLChakraProps,
} from '@chakra-ui/react'

import { cx, __DEV__ } from '@chakra-ui/utils'

import { getChildOfType } from '@saas-ui/react-utils'

import {
  PopoverTrigger as TourDialogTrigger,
  PopoverAnchor as TourDialogAnchor,
  PopoverContent as TourDialogContent,
  PopoverArrow as TourDialogArrow,
  PopoverCloseButton as TourDialogCloseButton,
  PopoverHeader as TourDialogHeader,
  PopoverBody as TourDialogBody,
  PopoverFooter as TourDialogFooter,
} from '@chakra-ui/react'

import defaultStyleConfig from './tour-dialog.styles'
import {
  Button,
  ButtonProps,
  ButtonGroup,
  ButtonGroupProps,
} from '@saas-ui/react'

import {
  useTourDialog,
  useTourDialogContext,
  TourDialogOptions,
  TourDialogContextProvider,
} from './use-tour-dialog'

export interface TourDialogProps extends TourDialogContainerProps {
  hideFooter?: boolean
  hideArrow?: boolean
  hideCloseButton?: boolean
  closeProps?: ButtonProps
}

export const TourDialog = forwardRef<
  TourDialogProps,
  typeof TourDialogContainer
>((props, ref) => {
  const {
    children,
    title,
    hideFooter,
    hideArrow,
    hideCloseButton,
    closeProps,
  } = props

  const triggerComponent = getChildOfType(children, TourDialogTrigger)
  const bodyComponent = getChildOfType(children, TourDialogBody)
  const footerComponent = getChildOfType(children, TourDialogFooter)

  let footer
  if (!hideFooter) {
    footer = footerComponent || (
      <TourDialogFooter>
        <TourDialogProgress />
        <TourDialogActions />
      </TourDialogFooter>
    )
  }

  return (
    <TourDialogContainer {...props}>
      {triggerComponent}
      <TourDialogContent ref={ref}>
        {!hideArrow && <TourDialogArrow />}
        {title && !hideCloseButton && <TourDialogCloseButton {...closeProps} />}
        {title && <TourDialogHeader>{title}</TourDialogHeader>}
        {bodyComponent}
        {footer}
      </TourDialogContent>
    </TourDialogContainer>
  )
})

if (__DEV__) {
  TourDialog.displayName = 'TourDialog'
}

export interface TourDialogContainerProps extends TourDialogOptions {}

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

export interface TourDialogProgressProps extends HTMLChakraProps<'p'> {
  /**
   * The current step
   */
  step?: number
  /**
   * Total steps
   */
  total?: number
  /**
   * The progress label
   * Accepts :step and :total string template vars
   */
  label?: React.ReactNode
}

function renderProgress(
  progress: React.ReactNode,
  step: number,
  total: number,
) {
  if (typeof progress === 'string') {
    return progress
      .replace(':step', String(step))
      .replace(':total', String(total))
  }

  return progress
}

export const TourDialogProgress: React.FC<TourDialogProgressProps> = (
  props,
) => {
  const { step = 1, total, label = 'Step :step of :total', ...rest } = props
  return total ? (
    <chakra.p {...rest}>{renderProgress(label, step, total)}</chakra.p>
  ) : null
}

if (__DEV__) {
  TourDialogProgress.displayName = 'TourDialogProgress'
}

export interface TourDialogActionsProps extends ButtonGroupProps {
  primaryActionProps?: ButtonProps
  secondaryActionProps?: ButtonProps
}

export const TourDialogActions: React.FC<TourDialogActionsProps> = (props) => {
  const { primaryActionProps, secondaryActionProps } = props

  const { getPrimaryActionProps, getSecondaryActionProps } =
    useTourDialogContext()

  return (
    <ButtonGroup
      size="sm"
      variant="ghost"
      flex="1"
      justifyContent="flex-end"
      {...props}
    >
      <Button {...getSecondaryActionProps(secondaryActionProps)} />
      <Button {...getPrimaryActionProps(primaryActionProps)} />
    </ButtonGroup>
  )
}

if (__DEV__) {
  TourDialogActions.displayName = 'TourDialogActions'
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
