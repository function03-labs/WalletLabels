import { Container, Spacer } from '@chakra-ui/react'
import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  Toolbar,
  ToolbarButton,
  ToolbarToggleGroup,
  ToolbarToggleButton,
} from '..'

import {
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
} from 'react-icons/fi'
import { ToolbarDivider } from '../..'

export default {
  title: 'Components/Layout/Toolbar',
  decorators: [
    (Story: any) => (
      <Container mt="40px" maxW="container.lg">
        <Story />
      </Container>
    ),
  ],
} as Meta

const toolbarStyles = {
  borderWidth: '1px',
  borderRadius: 'md',
  p: 2,
}

const items = (
  <>
    <ToolbarToggleGroup spacing="1" defaultValue="left" onChange={console.log}>
      <ToolbarToggleButton
        icon={<FiAlignLeft />}
        label="Align left"
        value="left"
      />
      <ToolbarToggleButton
        icon={<FiAlignCenter />}
        label="Align center"
        value="center"
      />
      <ToolbarToggleButton
        icon={<FiAlignRight />}
        label="Align right"
        value="right"
      />
    </ToolbarToggleGroup>
    <ToolbarDivider />
    <ToolbarToggleGroup spacing="1" type="checkbox">
      <ToolbarToggleButton icon={<FiBold />} label="Bold" value="bold" />
      <ToolbarToggleButton icon={<FiItalic />} label="Italic" value="italic" />
      <ToolbarToggleButton
        icon={<FiUnderline />}
        label="Underline"
        value="underline"
      />
    </ToolbarToggleGroup>
    <ToolbarDivider />
    <ToolbarButton icon={<FiLink />} label="Create link" />
    <Spacer />
    <ToolbarButton label="Save" variant="solid" colorScheme="primary" />
  </>
)

const Template: Story = (args) => <Toolbar {...args} sx={toolbarStyles} />

export const Basic = Template.bind({})
Basic.args = {
  spacing: 1,
  size: 'sm',
  children: items,
}

export const Sizes = Template.bind({})
Sizes.args = {
  size: 'xs',
  children: items,
}
