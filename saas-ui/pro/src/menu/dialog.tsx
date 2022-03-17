import * as React from 'react'

import {
  ModalFooter,
  MenuListProps,
  useMenuList,
  chakra,
  StylesProvider,
  useMultiStyleConfig,
  forwardRef,
  useMenuContext,
  Menu,
} from '@chakra-ui/react'

import { BaseModal, BaseModalProps } from '@saas-ui/modals'

export interface MenuDialogProps extends BaseModalProps {
  /**
   * The modal footer, wrapped with `ModalFooter`
   */
  footer?: React.ReactNode
}

export const MenuDialog: React.FC<MenuDialogProps> = (props) => {
  return <Menu {...props} />
}

MenuDialog.defaultProps = {
  variant: 'dialog',
}

export interface MenuDialogListProps
  extends Omit<
      BaseModalProps,
      'isOpen' | 'onClose' | 'children' | 'scrollBehavior'
    >,
    Omit<MenuListProps, 'title'> {}

export const MenuDialogList = forwardRef<MenuDialogListProps, 'div'>(
  (props, ref) => {
    const {
      rootProps,
      title,
      footer,
      initialFocusRef,
      hideCloseButton,
      motionPreset,
      ...rest
    } = props

    const { isOpen, onClose, menuRef } = useMenuContext()

    const ownProps = useMenuList(rest, ref)

    const styles = useMultiStyleConfig('Menu', props)

    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef || menuRef}
        title={title}
        hideCloseButton={hideCloseButton}
        motionPreset={motionPreset}
      >
        <StylesProvider value={styles}>
          <chakra.div
            {...ownProps}
            __css={{
              outline: 0,
              maxHeight: '80vh', // can override this in theme
              overflowY: 'auto', // can override this in theme
              ...styles.list,
              boxShadow: 'none',
              border: 0,
            }}
          />
        </StylesProvider>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </BaseModal>
    )
  },
)
