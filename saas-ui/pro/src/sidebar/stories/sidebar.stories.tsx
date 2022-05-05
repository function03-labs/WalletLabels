import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react'

import { FiHome, FiUsers, FiSettings, FiHash } from 'react-icons/fi'

import { AppShell } from '../../app-shell'

import { SaasUIGlyph } from './saas-ui-glyph'

import {
  Sidebar,
  SidebarProps,
  SidebarDivider,
  SidebarLink,
  SidebarNav,
  SidebarMenu,
  SidebarNavGroup,
} from '..'
import { MenuItem, PersonaAvatar } from '@saas-ui/react'
import { SidebarOverflow } from '../..'

export default {
  title: 'Components/Navigation/Sidebar',
  decorators: [
    (Story: any) => (
      <AppShell
        borderWidth="1px"
        variant="default"
        height="calc(100vh - 40px)"
        sidebar={<Story />}
      >
        {null}
      </AppShell>
    ),
  ],
} as Meta

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const WithLinks = Template.bind({})
WithLinks.args = {
  children: (
    <SidebarNav>
      <SidebarLink label="Home" />
      <SidebarLink label="Users" />
      <SidebarLink label="Settings" />
    </SidebarNav>
  ),
}

export const WithLinkIcons = Template.bind({})
WithLinkIcons.args = {
  children: (
    <SidebarNav>
      <SidebarLink label="Home" icon={<FiHome />} />
      <SidebarLink label="Users" icon={<FiUsers />} />
      <SidebarLink label="Settings" icon={<FiSettings />} />
    </SidebarNav>
  ),
}

export const WithHorizontalNav = Template.bind({})
WithHorizontalNav.args = {
  children: (
    <>
      <SidebarNav direction="row">
        <SaasUIGlyph width="24px" />
        <Spacer />
        <SidebarMenu icon={<PersonaAvatar presence="online" size="xs" />}>
          <MenuItem>Sign out</MenuItem>
        </SidebarMenu>
      </SidebarNav>
      <SidebarNav>
        <SidebarLink label="Home" icon={<FiHome />} />
        <SidebarLink label="Users" icon={<FiUsers />} />
        <SidebarLink label="Settings" icon={<FiSettings />} />
      </SidebarNav>
    </>
  ),
}

export const WithResize = Template.bind({})
WithResize.args = {
  isResizable: true,
  minWidth: 220,
  maxWidth: 500,
  children: <SidebarNav></SidebarNav>,
}

export const WithCollapsibleGroup = Template.bind({})
WithCollapsibleGroup.args = {
  children: (
    <>
      <SidebarNav direction="row">
        <SaasUIGlyph width="24px" />
        <Spacer />
        <SidebarMenu icon={<PersonaAvatar presence="online" size="xs" />}>
          <MenuItem>Sign out</MenuItem>
        </SidebarMenu>
      </SidebarNav>
      <SidebarOverflow>
        <SidebarNav>
          <SidebarNavGroup>
            <SidebarLink label="Home" icon={<FiHome />} isActive />
            <SidebarLink label="Users" icon={<FiUsers />} />
            <SidebarLink label="Settings" icon={<FiSettings />} />
          </SidebarNavGroup>

          <SidebarNavGroup title="Tags" isCollapsible>
            <SidebarLink label="Design system" icon={<FiHash />} />
            <SidebarLink label="Framework" icon={<FiHash />} />
            <SidebarLink label="Chakra UI" inset={5} icon={<FiHash />} />
            <SidebarLink label="React" inset={5} icon={<FiHash />} />
          </SidebarNavGroup>
        </SidebarNav>
      </SidebarOverflow>
    </>
  ),
}

export const VariantCondensed = Template.bind({})
VariantCondensed.args = {
  variant: 'condensed',
  children: (
    <>
      <SidebarNav>
        <SaasUIGlyph width="24px" />
      </SidebarNav>
      <SidebarNav>
        <SidebarLink label="Home" icon={<FiHome />} />
        <SidebarLink label="Users" icon={<FiUsers />} />
        <SidebarLink label="Settings" icon={<FiSettings />} />
      </SidebarNav>
    </>
  ),
}

export const VariantCondensedColor = Template.bind({})
VariantCondensedColor.args = {
  variant: 'condensed',
  colorScheme: 'purple',
  children: (
    <>
      <SidebarNav>
        <SaasUIGlyph width="24px" variant="solid" color="white" />
      </SidebarNav>
      <SidebarNav>
        <SidebarLink label="Home" icon={<FiHome />} color="white" />
        <SidebarLink label="Users" icon={<FiUsers />} color="white" />
        <SidebarLink label="Settings" icon={<FiSettings />} color="white" />
      </SidebarNav>
    </>
  ),
}

export const DoubleSidebar = () => {
  return (
    <HStack alignItems="stretch" spacing="0">
      <Sidebar variant="condensed" colorScheme="purple" border="0">
        <SidebarNav py="1">
          <SaasUIGlyph width="24px" variant="solid" color="white" />
        </SidebarNav>
        <SidebarOverflow>
          <SidebarNav>
            <SidebarLink
              label="Users"
              icon={<FiUsers />}
              color="white"
              isActive
            />
            <SidebarLink label="Settings" icon={<FiSettings />} color="white" />
          </SidebarNav>
        </SidebarOverflow>
        <Spacer />
        <SidebarNav>
          <SidebarMenu icon={<PersonaAvatar presence="online" size="xs" />}>
            <MenuItem>Sign out</MenuItem>
          </SidebarMenu>
        </SidebarNav>
      </Sidebar>
      <Sidebar>
        <SidebarNav direction="row">
          <Heading size="sm" py="2">
            Users
          </Heading>
          <Spacer />
        </SidebarNav>
        <SidebarOverflow>
          <SidebarNav>
            <SidebarNavGroup>
              <SidebarLink label="Overview" icon={<FiUsers />} isActive />
            </SidebarNavGroup>

            <SidebarNavGroup title="Tags" isCollapsible>
              <SidebarLink label="Design system" icon={<FiHash />} />
              <SidebarLink label="Framework" icon={<FiHash />} />
              <SidebarLink label="Chakra UI" inset={5} icon={<FiHash />} />
              <SidebarLink label="React" inset={5} icon={<FiHash />} />
            </SidebarNavGroup>
          </SidebarNav>
        </SidebarOverflow>
      </Sidebar>
    </HStack>
  )
}
