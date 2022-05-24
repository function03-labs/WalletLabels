import * as React from 'react'

import {
  chakra,
  Image,
  Modal,
  ModalProps,
  ModalContent,
  ModalCloseButton as BenefitsModalCloseButton,
  ModalBody as BenefitsModalBody,
  ModalHeader as BenefitsModalHeader,
  ModalFooter as BenefitsModalFooter,
  ModalOverlay,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

import { getChildOfType } from '@saas-ui/react-utils'

import {
  TourDialogContextProvider,
  TourDialogOptions,
  useTourDialog,
} from './use-tour-dialog'

import { TourDialogActions, TourDialogActionsProps } from './tour-dialog'

export interface BenefitsModalProps
  extends Omit<ModalProps, 'size' | 'variant'> {
  title?: React.ReactNode
  hideOverlay?: boolean
  hideCloseButton?: boolean
  hideFooter?: boolean
}

export const BenefitsModal: React.FC<BenefitsModalProps> = (props) => {
  const {
    children,
    title,
    hideOverlay,
    hideCloseButton,
    hideFooter,
    ...containerProps
  } = props

  const mediaComponent = getChildOfType(children, BenefitsModalMedia)
  const bodyComponent = getChildOfType(children, BenefitsModalBody)
  const footerComponent = getChildOfType(children, BenefitsModalFooter)

  let footer
  if (!hideFooter) {
    footer = footerComponent || (
      <BenefitsModalFooter>
        <BenefitsModalActions />
      </BenefitsModalFooter>
    )
  }

  return (
    <BenefitsModalContainer {...containerProps}>
      {!hideOverlay && <ModalOverlay />}
      <ModalContent>
        {!hideCloseButton && <BenefitsModalCloseButton />}
        {mediaComponent}

        {typeof title === 'string' ? (
          <BenefitsModalHeader>{title}</BenefitsModalHeader>
        ) : (
          title
        )}

        {bodyComponent}

        {footer}
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

export interface BenefitsModalMediaProps extends HTMLChakraProps<'div'> {
  src?: string
}

export const BenefitsModalMedia: React.FC<BenefitsModalMediaProps> = (
  props,
) => {
  const { children, src, ...rest } = props
  return (
    <chakra.div {...rest}>
      {src && <Image src={src} />}
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  BenefitsModalMedia.displayName = 'BenefitsModalMedia'
}

export const BenefitsModalActions: React.FC<TourDialogActionsProps> = (
  props,
) => {
  const { primaryActionProps, ...rest } = props
  return (
    <TourDialogActions
      {...rest}
      primaryActionProps={{
        variant: 'solid',
        colorScheme: 'primary',
        ...primaryActionProps,
      }}
    />
  )
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
