import { Card, List, ListItem, useModals, useSnackbar } from '@saas-ui/react'
import { Section } from '@saas-ui/pro'

import { FiChevronRight } from 'react-icons/fi'

import { SettingsPage } from '@app/features/core/components/settings-page'

import { UpdatePasswordDialog } from '../../components/update-password-dialog'

function TwoFactorAuthItem() {
  return (
    <ListItem
      onClick={() => null}
      primary="Two-factor authentication"
      tertiary="Not enabled"
      action={<FiChevronRight />}
    />
  )
}

function PasswordListItem() {
  const modals = useModals()
  const snackbar = useSnackbar()

  return (
    <ListItem
      onClick={() => {
        const id = modals.open({
          title: 'Update your password',
          component: UpdatePasswordDialog,
          onSuccess() {
            snackbar.success('Your password has been updated.')
            modals.close(id)
          },
        })
      }}
      primary="Password"
      tertiary="Last changed January 1st 2022"
      action={<FiChevronRight />}
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
