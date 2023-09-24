import * as React from 'react'
import {
  Badge,
  BadgeProps,
  Box,
  Button,
  chakra,
  HTMLChakraProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  MenuProps,
  Portal,
  Tag,
  TagCloseButton,
  TagLabel,
  TagProps,
  useControllableState,
  UseControllableStateProps,
  useDisclosure,
} from '@chakra-ui/react'
import { MenuInput, useSearchQuery } from '@saas-ui-pro/react'
import { PlusIcon } from 'lucide-react'

export interface TagsListProps extends HTMLChakraProps<'div'> {
  children: React.ReactNode
}

export const TagsList: React.FC<TagsListProps> = (props) => {
  return <chakra.div {...props}>{props.children}</chakra.div>
}

export interface TagsListItemProps extends Omit<TagProps, 'rightIcon'> {
  icon?: React.ReactNode
  onDelete?(): void
}

export const TagsListItem: React.FC<TagsListItemProps> = (props) => {
  const { icon, children, onDelete } = props

  let _icon
  if (icon && React.isValidElement<any>(icon)) {
    _icon = React.cloneElement(icon, {
      verticalAlign: 'top',
      marginEnd: '0.5rem',
    })
  }

  return (
    <Tag me="1" mb="1">
      {_icon}
      <TagLabel>{children}</TagLabel>
      {onDelete && <TagCloseButton onClick={onDelete} />}
    </Tag>
  )
}

export interface TagColorProps extends BadgeProps {}

export const TagColor: React.FC<TagColorProps> = (props) => {
  return (
    <Badge bg="currentColor" borderRadius="full" boxSize="8px" {...props} />
  )
}

export interface AddTagProps
  extends UseControllableStateProps<string[]>,
    Omit<MenuProps, 'children'> {
  tags?: Array<{ id: string; label: string; color?: string }>
  onCreate?(tag: string): void
}

export const AddTag: React.FC<AddTagProps> = (props) => {
  const {
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
    onCreate: onCreateProp,
  } = props

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue || [],
    value: valueProp,
    onChange: onChangeProp,
  })

  const {
    results,
    onReset,
    value: inputValue,
    ...inputProps
  } = useSearchQuery({
    items: props.tags || [],
    fields: ['label'],
  })

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose() {
      setTimeout(() => {
        onReset()
      }, 100) // prevent flicker
    },
  })

  const onCreate = (tag: string) => {
    onCreateProp?.(tag)
    onClose()
    setValue([...value, tag])
  }

  return (
    <Menu
      closeOnSelect={false}
      placement="left-start"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <MenuButton
        as={Button}
        size="xs"
        borderRadius="full"
        variant="outline"
        borderColor="transparent"
        color="muted"
        _hover={{
          color: 'chakra-body-text',
          borderColor: 'chakra-border-color',
        }}
        leftIcon={<PlusIcon />}
      >
        Add tag
      </MenuButton>
      <Portal>
        <MenuList pt="0" zIndex="dropdown">
          <Box
            borderBottomWidth="1px"
            borderColor="rgba(0, 0, 0, 0.1)"
            _dark={{ borderColor: 'rgba(255,255,255, 0.1)' }}
          >
            <MenuInput
              placeholder="Add tags"
              command="L"
              onKeyUp={(e) => {
                if (e.key === 'Enter' && !results?.length && inputValue) {
                  onCreate?.(inputValue)
                }
              }}
              {...inputProps}
            />
          </Box>
          <MenuOptionGroup
            type="checkbox"
            value={value}
            onChange={(value) => setValue(value as string[])}
          >
            {!inputValue || results?.length ? (
              (results || []).map(({ label, color }) => {
                return (
                  <MenuItemOption
                    key={label}
                    value={label}
                    flexDirection="row-reverse"
                    pe="0"
                  >
                    <TagColor color={color} me="2" /> {label}
                  </MenuItemOption>
                )
              })
            ) : (
              <MenuItem onClick={() => onCreate?.(inputValue)}>
                Create tag:{' '}
                <chakra.span color="muted" ms="1">
                  "{inputValue}"
                </chakra.span>
              </MenuItem>
            )}
          </MenuOptionGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
}
