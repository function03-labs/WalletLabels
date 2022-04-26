import * as React from 'react'

import { VStack } from '@chakra-ui/react'
import { Modal, BaseModalProps, Button, ButtonGroup } from '@saas-ui/react'

import { DatePickerStatic, DatePickerStaticProps } from './date-picker'

import { useDatePickerModal } from './use-date-picker-modal'

export interface DatePickerModalProps
  extends Omit<BaseModalProps, 'size' | 'variant'>,
    DatePickerStaticProps {}

export const DatePickerModal: React.FC<DatePickerModalProps> = (props) => {
  const { getModalProps, getDatePickerProps, onClose, onSubmit } =
    useDatePickerModal(props)

  const footer = (
    <ButtonGroup>
      <Button label="Cancel" variant="ghost" onClick={onClose} />
      <Button label="Submit" colorScheme="primary" onClick={onSubmit} />
    </ButtonGroup>
  )

  return (
    <Modal {...getModalProps({ size: '2xl', footer })}>
      <VStack>
        <DatePickerStatic {...getDatePickerProps()} />
      </VStack>
    </Modal>
  )
}
