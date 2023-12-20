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
  Divider,
  Box,
  Text,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  Heading,
} from '@chakra-ui/react'
import {
  Persona,
  PersonaAvatar,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
  StructuredList,
  StructuredListCell,
  StructuredListItem,
} from '@saas-ui/react'
import { LuPencil, LuTrash, LuCircle } from 'react-icons/lu'
import { SearchInput } from '@saas-ui/react'

export interface TagItem {
  id: any
  name: string
  count: number
  color: string
}

export interface ManageTaskModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  searchPlaceholder?: string
  items: TagItem[]
  editCallback?: (items: TagItem[]) => void
  deleteCallback?: (items: TagItem[]) => void
  callback?: (items: TagItem[]) => void
  buttonLabel?: string
}

const Tag: React.FC<{ item: TagItem }> = ({ item }) => {
  return (
    <>
      <StructuredListItem dir="row" px={0}>
        <StructuredListCell px={0}>
          <Box bgColor={item.color} borderRadius="full" w={3} h={3} />
        </StructuredListCell>
        <StructuredListCell>
          <Text>{item.name}</Text>
        </StructuredListCell>
        <StructuredListCell>
          <Text fontSize="xs" color={'gray.400'}>
            {item.count}
          </Text>
        </StructuredListCell>
      </StructuredListItem>
      <StructuredListItem px={0}>
        <StructuredListCell px={0}>
          <Button
            bg={'transparent'}
            onClick={() => alert('Edit: ' + item.name)}
          >
            <LuPencil />
          </Button>
        </StructuredListCell>
        <StructuredListCell px={0}>
          <Button
            bg={'transparent'}
            onClick={() => alert('Delete: ' + item.name)}
          >
            <LuTrash />
          </Button>
        </StructuredListCell>
      </StructuredListItem>
    </>
  )
}

export const ManageTaskModal: React.FC<ManageTaskModalProps> = (props) => {
  const { isOpen, onClose, items } = props
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [items, searchTerm])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pt={2}>
        <ModalHeader>
          <Stack align="left" justify="space-between" dir="column">
            <ModalCloseButton />
            <Heading fontSize="lg" fontWeight={'medium'}>
              {props.title || 'Select Users'}
            </Heading>
            <Text fontSize="sm" fontWeight="normal" color={'gray.500'} mb={2}>
              {props.description ||
                'Select users to add or remove them from the project'}
            </Text>
            <SearchInput
              placeholder={props.searchPlaceholder || 'Search...'}
              onChange={(e) => setSearchTerm(e.target.value)}
              onReset={() => setSearchTerm('')}
            />
          </Stack>
        </ModalHeader>
        <Divider />

        <StructuredList overflowY="hidden" maxHeight="700px" gap={0} pt={0}>
          {filteredItems.map((item) => (
            <StructuredListItem key={item.id || item.name} py={0}>
              <ModalBody>
                <Stack direction="row" justify="space-between">
                  <Tag item={item} />
                </Stack>
              </ModalBody>
            </StructuredListItem>
          ))}
        </StructuredList>

        <Divider />
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="purple"
            variant="primary"
            onClick={() => props.callback && props.callback(items)}
          >
            {props.buttonLabel || 'Add Tag'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const ManageTaskModalPreview = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const mockItems: TagItem[] = [
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
  ]

  return (
    <>
      <Button onClick={onOpen} variant="primary" colorScheme="purple">
        Open Manage Task Modal
      </Button>
      <ManageTaskModal
        items={mockItems}
        isOpen={isOpen}
        onClose={onClose}
        title="Manage Tags"
        description="Oversee your tags: create, adjust, or delete."
        callback={(items: TagItem[]) => {
          alert('Your item are: ' + items.map((item) => item.name))
          onClose()
        }}
      />
    </>
  )
}
