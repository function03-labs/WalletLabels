import { Card, List, ListItem, useModals } from '@saas-ui/react'
import { Section } from '@saas-ui/pro'

import { useDisclosure } from '@chakra-ui/hooks'
import { ChevronRightIcon } from '@chakra-ui/icons'

import { SettingsPage } from '@modules/core/components/settings-page'

import { UpdatePasswordDialog } from '../../components/update-password-dialog'

function TwoFactorAuthItem() {
  return (
    <ListItem
      onClick={() => null}
      primary="Two-factor authentication"
      tertiary="Not enabled"
      action={<ChevronRightIcon />}
    />
  )
}

function PasswordListItem() {
  const disclosure = useDisclosure()

  const modals = useModals()

  return (
    <ListItem
      onClick={() => modals.open?.(UpdatePasswordDialog)}
      primary="Password"
      tertiary="Last changed January 1st 2022"
      action={<ChevronRightIcon />}
    />
  )
}

function AccountSignIn() {
  return (
    <Section
      title="Signing in"
      description="Update your password and improve account security."
      isAnnotated
    >
      <Card>
        <List variant="settings">
          <PasswordListItem />
          <TwoFactorAuthItem />
        </List>
      </Card>
    </Section>
  )
}

export function AccountSecurityPage() {
  return (
    <SettingsPage
      title="Security"
      description="Manage your account security"
      isLoading={false}
    >
      <AccountSignIn />
    </SettingsPage>
  )
}
