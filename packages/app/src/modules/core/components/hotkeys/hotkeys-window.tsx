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
} from '@saas-ui/react'

export interface HotkeysWindowProps extends Omit<DrawerProps, 'children'> {
  /**
   * The hotkeys window title
   * @type string
   * @default "Keyboard shortcuts"
   */
  title?: string
}

export const HotkeysWindow = ({
  title = 'Keyboard shortcuts',
  isOpen,
  onClose,
  ...rest
}: HotkeysWindowProps) => {
  const searchRef = useRef<HTMLInputElement | null>(null)

  const { hotkeys } = useHotkeysContext()

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={searchRef}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

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
