import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Box,
  Text,
  Heading,
  useDisclosure,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Stack,
  ModalCloseButton,
  HStack,
  ModalBody,
  ModalFooter,
  ModalProps,
  useControllableState,
  Collapse,
} from '@chakra-ui/react'
import {
  SearchInput,
  StructuredList,
  StructuredListCell,
  StructuredListItem,
} from '@saas-ui/react'
import { LuPencil, LuTrash } from 'react-icons/lu'

export interface Tag {
  id: string
  name: string
  count: number
  color: string
}

interface TagListItemProps {
  item: Tag
  isEditing?: boolean
  onEdit?: () => void
  onCancel?: () => void
  onSave?: (tag: Tag) => Promise<void>
  onDelete?: () => void
}

const TagListItem: React.FC<TagListItemProps> = (props) => {
  const {
    item,
    isEditing,
    onEdit: onEditProp,
    onCancel: onCancelProp,
    onSave: onSaveProp,
    onDelete: onDeleteProp,
  } = props

  const [edit, setEdit] = useControllableState({
    value: isEditing,
    defaultValue: false,
  })

  const [error, setError] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const [values, setValues] = useState({
    color: item.color,
    name: item.name,
  })

  const onEdit = () => {
    setValues({
      color: item.color,
      name: item.name,
    })
    setEdit(true)
    onEditProp?.()
  }

  const onCancel = () => {
    setEdit(false)
    setError('')
    onCancelProp?.()
  }

  const onSave = async () => {
    try {
      setError('')
      setLoading(true)

      await onSaveProp?.({
        ...item,
        ...values,
      })

      setEdit(false)
    } catch (e: any) {
      setError(e.message)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const colorBadge = (
    <Box
      bgColor={`${values.color ?? item.color}.500`}
      borderRadius="full"
      w={2}
      h={2}
    />
  )

  return edit ? (
    <StructuredListItem role="group" py="1">
      <StructuredListCell ps="3">
        <IconButton aria-label="Change color" variant="outline">
          {colorBadge}
        </IconButton>
      </StructuredListCell>
      <StructuredListCell
        display="flex"
        alignItems="center"
        flex="1"
        gap="2"
        px="0"
      >
        <FormControl isInvalid={!!error}>
          <FormLabel display="none">Label</FormLabel>
          <Input
            type="text"
            defaultValue={item.name}
            value={values.name}
            size="sm"
            autoFocus
            px="2"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                // prevent modal from closing
                e.preventDefault()
                e.stopPropagation()

                // cancel editing
              } else if (e.key === 'Enter') {
                // save changes
                onSave()
              }
            }}
          />
        </FormControl>
      </StructuredListCell>
      <StructuredListCell display="flex" gap="2" pe="4">
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button
          variant="primary"
          isLoading={isLoading}
          onClick={() => onSave()}
        >
          Save
        </Button>
      </StructuredListCell>
    </StructuredListItem>
  ) : (
    <StructuredListItem role="group" py="1">
      <StructuredListCell ps="3">
        <Flex
          border="1px solid transparent"
          boxSize="8"
          alignItems="center"
          justifyContent="center"
        >
          {colorBadge}
        </Flex>
      </StructuredListCell>
      <StructuredListCell display="flex" alignItems="center" flex="1" gap="2">
        <Text as="span" fontSize="sm">
          {item.name}
        </Text>
        <Text as="span" fontSize="xs" color="muted">
          {item.count}
        </Text>
      </StructuredListCell>
      <StructuredListCell
        display="flex"
        gap="2"
        pe="4"
        opacity="0"
        _groupHover={{ opacity: 1 }}
      >
        <IconButton
          aria-label="edit"
          isRound
          variant="ghost"
          onClick={() => onEdit()}
        >
          <LuPencil />
        </IconButton>
        <IconButton
          aria-label="Delete"
          isRound
          variant="ghost"
          onClick={() => onDeleteProp?.()}
        >
          <LuTrash />
        </IconButton>
      </StructuredListCell>
    </StructuredListItem>
  )
}

interface TagListAddItemProps {
  isOpen?: boolean
  onCancel?: () => void
  onSave?: (tag: Pick<Tag, 'color' | 'name'>) => Promise<void>
}

const TagListAddItem: React.FC<TagListAddItemProps> = (props) => {
  const { isOpen, onCancel: onCancelProp, onSave: onSaveProp } = props

  const inputRef = React.useRef<HTMLInputElement>(null)

  const disclosure = useDisclosure({
    isOpen,
    defaultIsOpen: true,
    onClose: () => {
      setValues({
        color: 'gray',
        name: '',
      })
    },
  })

  const [error, setError] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const [values, setValues] = useState({
    color: 'gray',
    name: '',
  })

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const onCancel = () => {
    setError('')
    disclosure.onClose()
    onCancelProp?.()
  }

  const onSave = async () => {
    try {
      setError('')
      setLoading(true)

      await onSaveProp?.(values)

      disclosure.onClose()
    } catch (e: any) {
      setError(e.message)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const colorBadge = (
    <Box bgColor={`${values.color}.500`} borderRadius="full" w={2} h={2} />
  )

  return (
    <Collapse in={disclosure.isOpen}>
      <HStack
        role="group"
        py="2"
        bg="gray.50"
        px="2"
        _dark={{ bg: 'whiteAlpha.100' }}
        borderBottomWidth="1px"
      >
        <Box ps="3">
          <IconButton aria-label="Change color" variant="outline">
            {colorBadge}
          </IconButton>
        </Box>
        <HStack display="flex" alignItems="center" flex="1" gap="2" px="0">
          <FormControl isInvalid={!!error}>
            <FormLabel display="none">Label</FormLabel>
            <Input
              ref={inputRef}
              type="text"
              name="tag"
              placeholder="Tag name"
              value={values.name}
              size="sm"
              px="2"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  // prevent modal from closing
                  e.preventDefault()
                  e.stopPropagation()

                  // cancel editing
                } else if (e.key === 'Enter') {
                  // save changes
                  onSave()
                }
              }}
            />
          </FormControl>
        </HStack>
        <HStack gap="2" pe="4">
          <Button variant="secondary" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={isLoading}
            onClick={() => onSave()}
          >
            Save
          </Button>
        </HStack>
      </HStack>
    </Collapse>
  )
}

export const TagsModal = () => {
  const disclosure = useDisclosure({
    defaultIsOpen: true,
  })

  const [items, setItems] = useState<Tag[]>([
    {
      id: '1',
      name: 'Feature',
      count: 15,
      color: 'green',
    },
    {
      id: '2',
      name: 'Javascript',
      count: 4,
      color: 'blue',
    },
    {
      id: '3',
      name: 'Bug',
      count: 12,
      color: 'yellow',
    },
    {
      id: '4',
      name: 'Beta',
      count: 14,
      color: 'red',
    },
    {
      id: '5',
      name: 'Backend',
      count: 5,
      color: 'green',
    },
    {
      id: '6',
      name: 'Design',
      count: 2,
      color: 'purple',
    },
    {
      id: '7',
      name: 'UI',
      count: 6,
      color: 'red',
    },
    {
      id: '8',
      name: 'Discussion',
      count: 54,
      color: 'gray',
    },
  ])

  return (
    <>
      <Button onClick={disclosure.onOpen} variant="primary">
        Manage tags
      </Button>

      <ManageTagsModal
        {...disclosure}
        items={items}
        onSave={async (item) => {
          setItems((items) => {
            const index = items.findIndex((i) => i.id === item.id)
            items[index] = item
            return [...items].sort((a, b) => a.name.localeCompare(b.name))
          })
        }}
        onCreate={async (item) => {
          const tag = {
            id: `${items.length + 1}`,
            name: item.name,
            count: 0,
            color: item.color,
          }
          setItems((items) =>
            [...items, tag].sort((a, b) => a.name.localeCompare(b.name)),
          )
        }}
        onDelete={async (id) => {
          setItems((items) => {
            const index = items.findIndex((i) => i.id === id)
            items.splice(index, 1)
            return [...items]
          })
        }}
        // These properties are only required for demo purposes
        blockScrollOnMount={false}
        trapFocus={false}
      />
    </>
  )
}

interface SelectListModalProps extends Omit<ModalProps, 'children'> {
  items: Tag[]
  onSave: (tag: Tag) => Promise<void>
  onCreate: (tag: Pick<Tag, 'color' | 'name'>) => Promise<void>
  onDelete: (id: Tag['id']) => Promise<void>
}

export const ManageTagsModal = (props: SelectListModalProps) => {
  const { onClose, items, onSave, onCreate, onDelete, ...rest } = props

  const addTag = useDisclosure()
  const [editId, setEditId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items
    }

    return items.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [items, searchTerm])

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
              Manage tags
            </Heading>
            <Text fontSize="sm" fontWeight="normal" color="muted" mb={2}>
              Add, edit and delete tags.
            </Text>
            <HStack spacing="2">
              <SearchInput
                ref={inputRef}
                size="sm"
                placeholder="Filter by name..."
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
              <Button
                variant="primary"
                onClick={() => {
                  setEditId(null)
                  addTag.onOpen()
                }}
              >
                Add tag
              </Button>
            </HStack>
          </Stack>
        </ModalHeader>
        <ModalBody p="0" maxHeight="$80vh">
          <TagListAddItem
            {...addTag}
            onSave={async (tag) => {
              const result = await onCreate(tag)
              addTag.onClose()
              return result
            }}
            onCancel={() => addTag.onClose()}
          />
          <StructuredList>
            {noResults}
            {filteredItems.map((item) => (
              <TagListItem
                key={item.id}
                item={item}
                onEdit={() => {
                  setEditId(item.id)
                  addTag.onClose()
                }}
                onCancel={() => setEditId(null)}
                onSave={async (tag) => {
                  const result = await onSave(tag)
                  setEditId(null)
                  return result
                }}
                onDelete={() => onDelete(item.id)}
                isEditing={editId === item.id}
              />
            ))}
          </StructuredList>
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
