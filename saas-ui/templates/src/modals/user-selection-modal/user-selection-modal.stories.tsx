import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useDisclosure } from '@chakra-ui/react';
import { UserSelectionModal, User } from './user-selection-modal';

export default {
  title: 'Templates/Modals/UserSelectionModal',
  decorators: [(Story) => <Story />],
} as Meta;

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


export { UserSelectionModal } from './user-selection-modal';
