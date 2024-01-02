import { SaasUIIcon } from '@saas-ui/assets'

import {
  AppShell,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
  PersonaAvatar,
} from '@saas-ui/react'

import {
  Stack,
  Skeleton,
  SkeletonText,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react'
import { BellIcon } from 'lucide-react'
import { Page, PageBody, PageHeader } from '@saas-ui-pro/react'

export const NavbarBranded = () => {
  return (
    <AppShell
      variant="static"
      height="480px"
      navbar={
        <Navbar position="sticky" colorScheme="primary">
          <NavbarBrand>
            <SaasUIIcon width="24px" color="currentColor" />
          </NavbarBrand>
          <NavbarContent display={{ base: 'hidden', sm: 'flex' }}>
            <NavbarItem>
              <NavbarLink href="#">Inbox</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink isActive href="#">
                Contacts
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Tasks</NavbarLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent as="div" justifyContent="end" spacing="2">
            <NavbarItem>
              <NavbarLink href="#">Help</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <IconButton
                variant="outline"
                isRound
                aria-label="Notifications"
                size="xs"
                _hover={{
                  bgColor: 'sidebar-on-muted',
                }}
                _active={{
                  bgColor: 'sidebar-on-subtle',
                }}
              >
                <BellIcon size="1.2em" />
              </IconButton>
            </NavbarItem>
            <Menu>
              <MenuButton>
                <PersonaAvatar
                  src="/showcase-avatar.jpg"
                  name="Beatriz"
                  size="xs"
                  presence="online"
                />
              </MenuButton>
              <MenuList color="chakra-body-text">
                <MenuGroup title="beatriz@saas-ui.dev">
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Help &amp; feedback</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem>Log out</MenuItem>
              </MenuList>
            </Menu>
          </NavbarContent>
        </Navbar>
      }
    >
      <Page>
        <PageHeader title="Contacts"></PageHeader>
        <PageBody>
          <Stack spacing="4" mb="14" pt="10">
            <Skeleton width="100px" height="24px" speed={0} />
            <SkeletonText speed={0} />
          </Stack>
          <Stack direction="row" spacing="8" mb="14">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="8" mb="14">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="8">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
        </PageBody>
      </Page>
    </AppShell>
  )
}
