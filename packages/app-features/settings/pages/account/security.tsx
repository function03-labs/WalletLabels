import { Card } from '@chakra-ui/react'
import {
  StructuredList,
  StructuredListItem,
  StructuredListCell,
  useSnackbar,
} from '@saas-ui/react'
import { Section, SectionBody, SectionHeader } from '@saas-ui-pro/react'

import { FiChevronRight } from 'react-icons/fi'

import { SettingsPage, useModals } from '@ui/lib'

import { UpdatePasswordDialog } from '../../components/update-password-dialog'

function TwoFactorAuthItem() {
  return (
    <StructuredListItem onClick={() => null}>
      <StructuredListCell flex="1">
        Two-factor authentication
      </StructuredListCell>
      <StructuredListCell color="muted" px="4">
        Not enabled
      </StructuredListCell>
      <StructuredListCell>
        <FiChevronRight />
      </StructuredListCell>
    </StructuredListItem>
  )
}

function PasswordListItem() {
  const modals = useModals()
  const snackbar = useSnackbar()

  return (
    <StructuredListItem
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
    >
      <StructuredListCell flex="1">Password</StructuredListCell>
      <StructuredListCell color="muted" px="4">
        Last changed January 1st 2022
      </StructuredListCell>
      <StructuredListCell>
        <FiChevronRight />
      </StructuredListCell>
    </StructuredListItem>
  )
}

function AccountSignIn() {
  return (
    <Section variant="annotated">
      <SectionHeader
        title="Signing in"
        description="Update your password and improve account security."
      />
      <SectionBody>
        <Card>
          <StructuredList variant="settings">
            <PasswordListItem />
            <TwoFactorAuthItem />
          </StructuredList>
        </Card>
      </SectionBody>
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
