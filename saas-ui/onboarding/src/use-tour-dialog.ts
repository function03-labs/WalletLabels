import * as React from 'react'

import { createContext, PropGetterV2, mergeRefs } from '@chakra-ui/react-utils'
import { callAllHandlers } from '@chakra-ui/utils'
import { ButtonProps, PopoverProps, useDisclosure } from '@chakra-ui/react'

export interface TourDialogOptions extends PopoverProps {
  onSubmit?(): Promise<any>
  primaryAction?: ButtonProps | null
  secondaryAction?: ButtonProps | null
}

export type TourDialogContext = ReturnType<typeof useTourDialog>

export const [TourDialogContextProvider, useTourDialogContext] =
  createContext<TourDialogContext>()

export const useTourDialog = (props: TourDialogOptions) => {
  const {
    initialFocusRef,
    onSubmit,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    defaultIsOpen,
    primaryAction,
    secondaryAction,
  } = props

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen,
    isOpen: isOpenProp,
    onClose: onCloseProp,
  })

  const primaryActionRef = React.useRef(null)

  const getPrimaryActionProps: PropGetterV2<'button'> = React.useCallback(
    (props, ref) => {
      return {
        label: 'OK',
        ...primaryAction,
        ...props,
        ref: mergeRefs(primaryActionRef, ref),
        // onClick: callAllHandlers(
        //   async () => {
        //     if (await onSubmit?.()) {
        //       onClose()
        //     }
        //   },
        //   props?.onClick,
        //   primaryAction?.onClick,
        // ),
      }
    },
    [onSubmit, onClose, primaryActionRef],
  )

  const getSecondaryActionProps: PropGetterV2<'button'> = React.useCallback(
    (props) => {
      return {
        label: 'Dismiss',
        ...secondaryAction,
        ...props,
        // onClick: callAllHandlers(
        //   () => onClose?.(),
        //   props?.onClick,
        //   secondaryAction?.onClick,
        // ),
      }
    },
    [onClose],
  )

  return {
    initialFocusRef: initialFocusRef || primaryActionRef,
    isOpen,
    onOpen,
    onClose,
    onToggle,
    getPrimaryActionProps,
    getSecondaryActionProps,
  }
}
