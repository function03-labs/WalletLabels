import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Card,
  CardHeader,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import {
  PersonaAvatar,
  SearchInput,
  StructuredList,
  StructuredListCell,
  StructuredListIcon,
  StructuredListItem,
} from '@saas-ui/react'
import { FiMoreVertical } from 'react-icons/fi'

const members = [
  {
    name: 'Renata Alink',
    email: 'hello@saas-ui.dev',
    presence: 'online',
    status: 'owner',
    avatar: '/showcase-avatar.jpg',
  },
  {
    name: 'Selini Shanta',
    email: 'selini@saas-ui.dev',
    status: 'invited',
    avatar: '/showcase-avatar2.jpg',
  },
]

export const Members = () => {
  return (
    <Card>
      <CardHeader>
        <Stack spacing="1">
          <Heading size="sm" fontWeight="semibold">
            Members
          </Heading>
          <Text color="muted" fontSize="sm">
            Manage and invite your colleagues
          </Text>
        </Stack>
      </CardHeader>
      <ButtonGroup px="3" py="3" borderTopWidth="1px">
        <Box>
          <SearchInput placeholder="Filter by name or email" size="sm" />
        </Box>
        <Spacer />
        <Button colorScheme="primary" variant="solid">
          Invite people
        </Button>
      </ButtonGroup>
      <StructuredList>
        {members.map((member) => (
          <StructuredListItem
            key={member.email}
            py="4"
            borderBottomWidth="1px"
            sx={{ '&:last-of-type': { borderWidth: 0 } }}
          >
            <StructuredListIcon>
              <PersonaAvatar
                name={member.name}
                presence={member.presence}
                size="xs"
              />
            </StructuredListIcon>
            <StructuredListCell flex="1" px="4">
              <Heading size="sm">{member.name || member.email}</Heading>
              <Text color="muted" fontSize="sm">
                {member.name ? member.email : null}
              </Text>
            </StructuredListCell>
            <StructuredListCell>
              <HStack>
                <Tag size="sm">{member.status}</Tag>
              </HStack>
            </StructuredListCell>
            <StructuredListCell>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  size="sm"
                  aria-label="More"
                />
                <MenuList>
                  <MenuItem>Remove</MenuItem>
                </MenuList>
              </Menu>
            </StructuredListCell>
          </StructuredListItem>
        ))}
      </StructuredList>
    </Card>
  )
}
