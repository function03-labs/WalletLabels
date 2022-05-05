import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Center, Stack } from '@chakra-ui/react'

import { FiHome } from 'react-icons/fi'

import { Sidebar, SidebarLink, SidebarLinkProps, SidebarNav } from '..'

export default {
  title: 'Components/Navigation/SidebarLink',
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Sidebar border="0">
          <SidebarNav>
            <Story />
          </SidebarNav>
        </Sidebar>
      </Center>
    ),
  ],
} as Meta

const Template: Story<SidebarLinkProps> = (args) => <SidebarLink {...args} />

export const Basic = Template.bind({})
Basic.args = {
  label: 'Link',
}

export const WithActiveState = Template.bind({})
WithActiveState.args = {
  label: 'Link',
  isActive: true,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: 'Link',
  icon: <FiHome />,
}

export const WithBadge = Template.bind({})
WithBadge.args = {
  label: 'Link',
  icon: <FiHome />,
}

export const VariantSubtle = Template.bind({})
VariantSubtle.args = {
  label: 'Link',
  icon: <FiHome />,
  variant: 'subtle',
  isActive: true,
}

export const VariantSolid = Template.bind({})
VariantSolid.args = {
  label: 'Link',
  icon: <FiHome />,
  variant: 'solid',
  isActive: true,
}

export const Sizes = () => {
  return (
    <Stack>
      <Template
        label="Link xs"
        size="xs"
        icon={<FiHome />}
        variant="solid"
        isActive
      />
      <Template
        label="Link sm"
        size="sm"
        icon={<FiHome />}
        variant="solid"
        isActive
      />
      <Template
        label="Link md"
        size="md"
        icon={<FiHome />}
        variant="solid"
        isActive
      />
      <Template
        label="Link lg"
        size="lg"
        icon={<FiHome />}
        variant="solid"
        isActive
      />
    </Stack>
  )
}
