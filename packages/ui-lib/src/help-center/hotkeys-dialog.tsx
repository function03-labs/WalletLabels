import React, { useRef } from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerProps,
} from '@chakra-ui/react'

import {
  HotkeysList,
  HotkeysSearch,
  HotkeysListItems,
  useHotkeysContext,
  useModals,
} from '@saas-ui/react'
import { BackButton } from '@saas-ui-pro/react'

export interface HotkeysDialogProps extends Omit<DrawerProps, 'children'> {
  /**
   * The hotkeys window title
   * @type string
   * @default "Keyboard shortcuts"
   */
  title?: string
}

export const HotkeysDialog = ({
  title = 'Keyboard shortcuts',
  isOpen,
  onClose,
  ...rest
}: HotkeysDialogProps) => {
  const searchRef = useRef<HTMLInputElement | null>(null)

  const { hotkeys } = useHotkeysContext()

  const modals = useModals()

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={searchRef}
      {...rest}
    >
      <DrawerOverlay onClick={() => modals.closeAll()} />
      <DrawerContent>
        <DrawerCloseButton onClick={() => modals.closeAll()} />
        <DrawerHeader>
          <BackButton onClick={onClose} /> {title}
        </DrawerHeader>

        <DrawerBody>
          <HotkeysList hotkeys={hotkeys}>
            <HotkeysSearch ref={searchRef} />
            <HotkeysListItems />
          </HotkeysList>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
