import {
  AspectRatio,
  Card,
  CardBody,
  CardFooter,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  SimpleGrid,
  CardHeader,
} from '@chakra-ui/react'
import { IconBadge } from '@saas-ui/react'
import { FaFileImage, FaFilePdf, FaFileWord } from 'react-icons/fa6'
import { FiFile, FiMoreHorizontal } from 'react-icons/fi'

export type FileCardProps = {
  name: string
  type: string
  previewUrl?: string
  icon: React.ReactNode
  color?: string
  size?: string
  modifiedAt?: string
}

export const FileCard: React.FC<FileCardProps> = (props) => {
  return (
    <Card role="group" position="relative">
      <CardHeader position="absolute" top="0" right="0" zIndex="1">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="View options"
            variant="solid"
            colorScheme="gray"
            boxShadow="sm"
            borderWidth="1px"
            display="none"
            _groupHover={{ display: 'flex' }}
            icon={<FiMoreHorizontal />}
          />
          <MenuList>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>
      <CardBody
        borderTopRadius="md"
        p="0"
        bg="gray.100"
        _dark={{ bg: 'gray.800' }}
        position="relative"
        overflow="hidden"
      >
        <AspectRatio ratio={16 / 9} bg="">
          {props.previewUrl ? (
            <Image src={props.previewUrl} />
          ) : (
            <Center>
              <Icon as={FiFile} boxSize="12" color="muted" />
            </Center>
          )}
        </AspectRatio>
      </CardBody>
      <CardFooter>
        <HStack spacing="3" alignItems="flex-start">
          <IconBadge color={props.color}>{props.icon}</IconBadge>

          <VStack alignItems="flex-start" spacing="0" lineHeight="1.4">
            <Heading as="h4" size="sm" fontWeight="regular">
              {props.name}
            </Heading>
            <Text color="muted" fontSize="sm">
              {props.size} • {props.modifiedAt}
            </Text>
          </VStack>
        </HStack>
      </CardFooter>
    </Card>
  )
}

const files: FileCardProps[] = [
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
]

export const FileCards = () => {
  return (
    <SimpleGrid columns={3} spacing="4">
      {files.map((file, i) => (
        <FileCard key={`${file.name}_${i}`} {...file} />
      ))}
    </SimpleGrid>
  )
}
