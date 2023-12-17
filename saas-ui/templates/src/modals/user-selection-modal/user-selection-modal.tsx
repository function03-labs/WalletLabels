import React, { useState } from 'react';
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
  Text,
  useColorModeValue,
  Box,
  Flex,
} from '@chakra-ui/react';
import {
  Persona,
  PersonaAvatar,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
} from '@saas-ui/react'
import { SearchInput } from '@saas-ui/react'
import { CloseButton } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useDisclosure } from '@chakra-ui/react';

export type User = {
  id: any;
  name: string;
  email: string;
  avatar?: string
  presence?: string;
};

export type UserSelectorProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  users: User[];
  callback?: (users: User[]) => void;
};

const UserPersona: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Persona>
      <PersonaAvatar name={user.avatar || user.name} presence={user.presence || "online"} size="sm" />
      <PersonaDetails>
        <PersonaLabel>{user.name}</PersonaLabel>
        <PersonaSecondaryLabel>{user.email}</PersonaSecondaryLabel>
      </PersonaDetails>
    </Persona>
  )
};

export const UserSelectionModal: React.FC<UserSelectorProps> = (props) => {
  const { isOpen, onClose, users } = props;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectUser = (email: string) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(email)
        ? prevSelectedUsers.filter((userEmail) => userEmail !== email)
        : [...prevSelectedUsers, email],
    );
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedBgColor = useColorModeValue('gray.50', 'gray.200');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pt={4}>
        <ModalBody>
          <CloseButton onClick={onClose} position="absolute" right={4} top={4} />
          <Flex gap={2} direction={"column"}>
            <Text fontSize="lg" fontWeight={"medium"}>{props.title || 'Select Users'}</Text>
            <Text color={"gray.500"} mb={2}>{props.description || 'Select users to add or remove them from the project'}</Text>
            <SearchInput
              placeholder={props.searchPlaceholder || 'Search...'}
              onChange={(e) => setSearchTerm(e.target.value)}
              onReset={() => setSearchTerm('')}
              mb={2}
            />
          </Flex>
        </ModalBody>
        <Divider />

        <Stack overflowY="hidden" maxHeight="700px" gap={0}>
          {filteredUsers.map((user) => (
            <Box key={user.email} bg={selectedUsers.includes(user.email) ? selectedBgColor : 'transparent'}>
              <ModalBody>
                <Stack direction="row" justify="space-between">
                  <UserPersona user={user} />
                  <Checkbox
                    key={user.email}
                    isChecked={selectedUsers.includes(user.email)}
                    onChange={() => handleSelectUser(user.email)}
                  />
                </Stack>
              </ModalBody>
            </Box>
          ))}
        </Stack>

        <Divider />
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="purple" variant="solid" onClick={() => props.callback && props.callback(users.filter(user => selectedUsers.includes(user.email)))}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const mockUsers: User[] = [
  { id: 1, name: 'Horace Torp', email: 'Esta.Gibson@gmail.com', presence: 'busy' },
  { id: 2, name: 'Louis Bosco', email: 'Trenton1@yahoo.com', presence: 'online' },
  { id: 3, name: 'Cory Bauch', email: 'Beau_Corwin27@hotmail.com', presence: 'offline' },
  { id: 4, name: 'Dr. Tyrone Parker', email: 'Johann_Schaden47@gmail.com', presence: 'busy' },
  { id: 5, name: 'Ora Ryan', email: 'Bernadine91@hotmail.com', presence: 'online' },
  { id: 6, name: 'Martin Koss IV', email: 'Hardy_Swanaiwski@yahoo.com', presence: 'busy' },
  { id: 7, name: 'Christian Dach', email: 'Emily.Adams@yahoo.com', presence: 'away' },
  { id: 8, name: 'Angel Pfeffer', email: 'Horacio_McLaughlin@yahoo.com', presence: 'dnd' },
  { id: 9, name: 'Kathryn DuBuque', email: 'Manuel22@yahoo.com', presence: 'offline' },
];

type Story = StoryObj<typeof UserSelectionModal>;
export const Default: Story = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <button onClick={onOpen}>Open Modal</button>
        <UserSelectionModal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
          title='Select Users'
          description='Select users to add or remove them from the project'
          callback={(users) => {
            const message = `You selected ${users.length} users: ${users.map((user) => user.name).join(', ')}`;
            alert(message);
            onClose();
          }}
        />
      </>
    );
  },
  args: {
    users: mockUsers,
  },
};
