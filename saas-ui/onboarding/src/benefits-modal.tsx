import * as React from 'react'

import {
  Image,
  Modal,
  ModalProps,
  ModalContent,
  ModalCloseButton as BenefitsModalCloseButton,
  ModalBody as BenefitsModalBody,
  ModalHeader as BenefitsModalHeader,
  ModalFooter as BenefitsModalFooter,
  ModalOverlay,
  AspectRatio,
  AspectRatioProps,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

import {
  TourDialogContextProvider,
  TourDialogOptions,
  useTourDialog,
} from './use-tour-dialog'

import { TourDialogActions, TourDialogActionsProps } from './tour-dialog'

export interface BenefitsModalProps
  extends Partial<Omit<ModalProps, 'size' | 'variant'>> {
  title?: React.ReactNode
  hideOverlay?: boolean
  hideCloseButton?: boolean
}

export const BenefitsModal: React.FC<BenefitsModalProps> = (props) => {
  const { children, title, hideOverlay, hideCloseButton, ...containerProps } =
    props

  return (
    <BenefitsModalContainer {...containerProps}>
      {!hideOverlay && <ModalOverlay />}
      <ModalContent>
        {!hideCloseButton && <BenefitsModalCloseButton />}
        {children}
      </ModalContent>
    </BenefitsModalContainer>
  )
}

export interface BenefitsModalContainerProps
  extends React.PropsWithChildren<TourDialogOptions> {}

export const BenefitsModalContainer: React.FC<BenefitsModalContainerProps> = (
  props,
) => {
  const { children, ...rest } = props

  const context = useTourDialog(props)

  const { initialFocusRef, isOpen, onClose } = context

  return (
    <TourDialogContextProvider value={context}>
      <Modal
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={onClose}
        {...rest}
      >
        {children}
      </Modal>
    </TourDialogContextProvider>
  )
}

if (__DEV__) {
  BenefitsModalContainer.displayName = 'BenefitsModalContainer'
}

export interface BenefitsModalMediaProps extends AspectRatioProps {
  src?: string
}

export const BenefitsModalMedia: React.FC<BenefitsModalMediaProps> = (
  props,
) => {
  const { children, src, ...rest } = props

  const content = src ? <Image src={src} /> : children

  return (
    <AspectRatio ratio={1} {...rest}>
      {content}
    </AspectRatio>
  )
}

if (__DEV__) {
  BenefitsModalMedia.displayName = 'BenefitsModalMedia'
}

export const BenefitsModalActions: React.FC<TourDialogActionsProps> = (
  props,
) => {
  return <TourDialogActions {...props} />
}

if (__DEV__) {
  BenefitsModalActions.displayName = 'BenefitsModalActions'
}

export {
  BenefitsModalCloseButton,
  BenefitsModalHeader,
  BenefitsModalBody,
  BenefitsModalFooter,
}
