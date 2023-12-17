import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useDisclosure } from '@chakra-ui/react';
import { UserSelectionModal, User } from './user-selection-modal';

export default {
  title: 'Templates/Modals/UserSelectionModal',
  decorators: [(Story) => <Story />],
} as Meta;

export { Default } from './user-selection-modal';
export { UserSelectionModal } from './user-selection-modal';
