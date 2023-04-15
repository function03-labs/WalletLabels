import { Meta } from '@storybook/react'
import { Sidebar, SidebarSection } from '@saas-ui/react'
import { SortableNavGroup, SortableNavItem } from './'

export default {
  title: 'Components/SortableNavGroup',
  component: SortableNavGroup,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Sidebar height="100vh">
        <SidebarSection>
          <Story />
        </SidebarSection>
      </Sidebar>
    ),
  ],
} as Meta

export const Default = {
  render: () => (
    <SortableNavGroup items={['home', 'users']}>
      <SortableNavItem id="home">Home</SortableNavItem>
      <SortableNavItem id="users">Users</SortableNavItem>
    </SortableNavGroup>
  ),
  args: {},
}
