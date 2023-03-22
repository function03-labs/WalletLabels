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

import { TourDialogContextProvider, useTourDialog } from './use-tour-dialog'

import { TourDialogActions, TourDialogActionsProps } from './tour-dialog'

export interface BenefitsModalProps extends BenefitsModalContainerProps {
  /**
   * Hide the overlay
   */
  hideOverlay?: boolean
  /**
   * Hide the close button
   */
  hideCloseButton?: boolean
  /**
   * Render the modal in the center of the screen
   * @default true
   */
  isCentered?: boolean
}

export const BenefitsModal: React.FC<BenefitsModalProps> = (props) => {
  const { children, hideOverlay, hideCloseButton, ...containerProps } = props

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
  extends Partial<Omit<ModalProps, 'size' | 'variant'>> {}

export const BenefitsModalContainer: React.FC<BenefitsModalContainerProps> = (
  props,
) => {
  const { children, isCentered = true, ...rest } = props

  const context = useTourDialog(props)

  const { initialFocusRef, isOpen, onClose } = context

  return (
    <TourDialogContextProvider value={context}>
      <Modal
        initialFocusRef={initialFocusRef}
        {...rest}
        isCentered={isCentered}
        isOpen={isOpen}
        onClose={onClose}
      >
        {children}
      </Modal>
    </TourDialogContextProvider>
  )
}

BenefitsModalContainer.displayName = 'BenefitsModalContainer'

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

BenefitsModalMedia.displayName = 'BenefitsModalMedia'

export const BenefitsModalActions: React.FC<TourDialogActionsProps> = (
  props,
) => {
  return <TourDialogActions {...props} />
}

BenefitsModalActions.displayName = 'BenefitsModalActions'

export {
  BenefitsModalCloseButton,
  BenefitsModalHeader,
  BenefitsModalBody,
  BenefitsModalFooter,
}
