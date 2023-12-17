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

export type User = {
  id: any;
  name: string;
  email: string;
  avatar: string
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
