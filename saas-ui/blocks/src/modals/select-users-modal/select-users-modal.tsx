import React, { useState, useMemo } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Checkbox,
  Stack,
  Text,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  Heading,
  ModalProps,
} from '@chakra-ui/react'
import {
  Persona,
  PersonaAvatar,
  PersonaDetails,
  PersonaLabel,
  PersonaProps,
  PersonaSecondaryLabel,
  StructuredList,
  StructuredListCell,
  StructuredListItem,
  SearchInput,
  useSnackbar,
} from '@saas-ui/react'

export interface SelectListModalItem {
  id: string | number
  label?: string
}

interface SelectListModalProps<
  Item extends SelectListModalItem = SelectListModalItem,
> extends Omit<ModalProps, 'children'> {
  title?: string
  description?: string
  searchPlaceholder?: string
  items: Item[]
  renderItem?: (item: Item) => React.ReactNode
  filterFn?: (item: Item, searchTerm: string) => boolean
  onSubmit?: (ids: Item['id'][]) => void
}

export const SelectListModal = <
  Item extends SelectListModalItem = SelectListModalItem,
>(
  props: SelectListModalProps<Item>,
) => {
  const { onClose, items, filterFn, ...rest } = props
  const [selected, setSelected] = useState<(string | number)[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSelect = (id: string | number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    )
  }

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items
    }

    return items.filter((item) => {
      if (filterFn) {
        return filterFn(item, searchTerm)
      }
      return item.label?.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [items, searchTerm])

  const renderItem = React.useCallback(
    (item: Item) => {
      if (props.renderItem) {
        return props.renderItem(item)
      }
      return <Text>{item.label}</Text>
    },
    [props.renderItem],
  )

  const noResults = searchTerm && filteredItems.length === 0 && (
    <StructuredListItem>
      <StructuredListCell py="2" px="4" textAlign="center">
        No results for "{searchTerm}"
      </StructuredListCell>
    </StructuredListItem>
  )

  return (
    <Modal onClose={onClose} initialFocusRef={inputRef} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth="1px">
          <Stack align="left" justify="space-between" dir="column" spacing="1">
            <ModalCloseButton />
            <Heading fontSize="lg" fontWeight="medium">
              {props.title}
            </Heading>
            <Text fontSize="sm" fontWeight="normal" color="muted" mb={2}>
              {props.description}
            </Text>
            <SearchInput
              ref={inputRef}
              size="sm"
              placeholder={props.searchPlaceholder || 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onReset={() => setSearchTerm('')}
              onKeyDown={(e) => {
                // prevent modal from closing
                if (e.key === 'Escape') {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
            />
          </Stack>
        </ModalHeader>

        <ModalBody p="0">
          <StructuredList overflowY="auto" maxHeight="$80vh" py="0">
            {noResults}
            {filteredItems.map((item) => (
              <StructuredListItem
                key={item.id}
                onClick={() => handleSelect(item.id)}
                data-selected={selected.includes(item.id) ? '' : undefined}
                _selected={{
                  backgroundColor: 'blackAlpha.100',
                  _dark: {
                    backgroundColor: 'whiteAlpha.100',
                  },
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelect(item.id)
                  }
                }}
              >
                <StructuredListCell ps="4">
                  {renderItem(item)}
                </StructuredListCell>
                <StructuredListCell pe="4">
                  <Checkbox
                    key={item.id}
                    isChecked={selected.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                  />
                </StructuredListCell>
              </StructuredListItem>
            ))}
          </StructuredList>
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <Button variant="secondary" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => props.onSubmit?.(selected)}>
            Add users
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

interface UserPersonaProps extends PersonaProps {
  email: string
}

const UserPersona: React.FC<UserPersonaProps> = (props) => {
  const { src, name, email, presence, ...rest } = props
  return (
    <Persona {...rest}>
      <PersonaAvatar
        name={name}
        src={src}
        presence={presence}
        size="sm"
        sx={{
          '.chakra-avatar__badge': {
            _dark: {
              '--avatar-border-color': 'var(--chakra-colors-gray-700)',
            },
          },
        }}
      />
      <PersonaDetails>
        <PersonaLabel>{name}</PersonaLabel>
        <PersonaSecondaryLabel>{email}</PersonaSecondaryLabel>
      </PersonaDetails>
    </Persona>
  )
}

export const SelectUsersModal = () => {
  const snackbar = useSnackbar()
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  })

  const users = [
    {
      id: 1,
      name: 'Horace Torp',
      email: 'Esta.Gibson@gmail.com',
      presence: 'busy',
    },
    {
      id: 2,
      name: 'Louis Bosco',
      email: 'Trenton1@yahoo.com',
      presence: 'online',
    },
    {
      id: 3,
      name: 'Cory Bauch',
      email: 'Beau_Corwin27@hotmail.com',
      presence: 'offline',
    },
    {
      id: 4,
      name: 'Dr. Tyrone Parker',
      email: 'Johann_Schaden47@gmail.com',
      presence: 'busy',
    },
    {
      id: 5,
      name: 'Ora Ryan',
      email: 'Bernadine91@hotmail.com',
      presence: 'online',
    },
    {
      id: 6,
      name: 'Martin Koss IV',
      email: 'Hardy_Swanaiwski@yahoo.com',
      presence: 'busy',
    },
    {
      id: 7,
      name: 'Christian Dach',
      email: 'Emily.Adams@yahoo.com',
      presence: 'away',
    },
    {
      id: 8,
      name: 'Angel Pfeffer',
      email: 'Horacio_McLaughlin@yahoo.com',
      presence: 'dnd',
    },
    {
      id: 9,
      name: 'Kathryn DuBuque',
      email: 'Manuel22@yahoo.com',
      presence: 'offline',
    },
  ]

  return (
    <>
      <Button onClick={onOpen} variant="primary" colorScheme="purple">
        Open Modal
      </Button>
      <SelectListModal
        items={users}
        renderItem={(user) => (
          <UserPersona
            key={user.id}
            name={user.name}
            email={user.email.toLowerCase()}
            presence={user.presence}
          />
        )}
        filterFn={(item, query) => {
          const q = query.toLowerCase()
          return (
            item.name.toLowerCase().includes(q) ||
            item.email.toLowerCase().includes(q)
          )
        }}
        isOpen={isOpen}
        onClose={onClose}
        title="Select users"
        description="Add or remove users from the project"
        onSubmit={(items) => {
          snackbar.info(`You selected ${items.length} users.`)
          onClose()
        }}
        // These properties are only required for demo purposes
        blockScrollOnMount={false}
        trapFocus={false}
      />
    </>
  )
}
