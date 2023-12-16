import {
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  IconBadge,
  StructuredList,
  StructuredListCell,
  StructuredListItem,
} from '@saas-ui/react'
import {
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
} from 'react-icons/fa6'
import { FiMoreVertical } from 'react-icons/fi'

export type FilesListProps = {
  name: string
  type: string
  previewUrl?: string
  icon: React.ReactNode
  color?: string
  size?: string
  modifiedAt?: string
}

export const FilesListItem: React.FC<FilesListProps> = (props) => {
  return (
    <StructuredListItem onClick={() => null}>
      <StructuredListCell>
        <IconBadge color={props.color}>{props.icon}</IconBadge>
      </StructuredListCell>
      <StructuredListCell flex="1">
        <HStack spacing="3" alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="0" lineHeight="1.4">
            <Heading as="h4" size="sm" fontWeight="normal">
              {props.name}
            </Heading>
            <Text color="muted" fontSize="sm">
              {props.size} • {props.modifiedAt}
            </Text>
          </VStack>
        </HStack>
      </StructuredListCell>
      <StructuredListCell>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="File options"
            variant="ghost"
            icon={<FiMoreVertical />}
          />
          <MenuList>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </StructuredListCell>
    </StructuredListItem>
  )
}

export const FilesList = () => {
  return (
    <Card>
      <CardHeader borderBottomWidth="1px">
        <Heading as="h3" size="sm" fontWeight="medium">
          Your files
        </Heading>
      </CardHeader>
      <CardBody p="0">
        <StructuredList pb="0">
          {files.map((file, i) => (
            <FilesListItem key={i} {...file} />
          ))}
          <StructuredListItem
            bg="gray.100"
            _dark={{
              bg: 'gray.700',
            }}
            borderBottomRadius="md"
            onClick={() => null}
          >
            <Center w="full">See all files</Center>
          </StructuredListItem>
        </StructuredList>
      </CardBody>
    </Card>
  )
}

const files: FilesListProps[] = [
  {
    name: 'manual.pdf',
    type: 'document',
    icon: <FaFilePdf />,
    color: 'red.500',
    size: '17KB',
    modifiedAt: '1 Sep 2023',
  },
  {
    name: 'proposal.docx',
    type: 'document',
    icon: <FaFileWord />,
    color: 'blue.500',
    size: '200KB',
    modifiedAt: '8 Nov 2023',
  },
  {
    name: 'holiday.jpg',
    type: 'image',
    previewUrl: '/img/mountains.jpg',
    icon: <FaFileImage />,
    size: '2.8MB',
    modifiedAt: '8 Aug 2023',
  },
  {
    name: 'slidedeck.ppt',
    type: 'presentation',
    icon: <FaFilePowerpoint />,
    color: 'yellow.500',
    size: '300KB',
    modifiedAt: '1 Sep 2023',
  },
]
