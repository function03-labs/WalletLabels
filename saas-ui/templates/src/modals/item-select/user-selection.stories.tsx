import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useDisclosure } from '@chakra-ui/react';

import { UserSelectionModal } from './user-selection';

export default {
  title: 'UserSelectionModal',
  component: UserSelectionModal,
} as Meta<typeof UserSelectionModal>;

const Template: StoryFn<typeof UserSelectionModal> = (args) => {
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
};

const mockUsers = [
  { name: 'Horace Torp', email: 'Esta.Gibson@gmail.com', presence: 'busy' },
  { name: 'Louis Bosco', email: 'Trenton1@yahoo.com', presence: 'online' },
  { name: 'Cory Bauch', email: 'Beau_Corwin27@hotmail.com', presence: 'offline' },
  { name: 'Dr. Tyrone Parker', email: 'Johann_Schaden47@gmail.com', presence: 'busy' },
  { name: 'Ora Ryan', email: 'Bernadine91@hotmail.com', presence: 'online' },
  { name: 'Martin Koss IV', email: 'Hardy_Swanaiwski@yahoo.com', presence: 'busy' },
  { name: 'Christian Dach', email: 'Emily.Adams@yahoo.com', presence: 'away' },
  { name: 'Angel Pfeffer', email: 'Horacio_McLaughlin@yahoo.com', presence: 'dnd' },
  { name: 'Kathryn DuBuque', email: 'Manuel22@yahoo.com', presence: 'offline' },
];

export const Default = Template.bind({});
Default.args = {
  users: mockUsers,
};

