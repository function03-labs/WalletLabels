import { Card, List, ListItem } from '@saas-ui/react'
import { Section } from '@saas-ui/pro'

import { SettingsPage } from '@modules/core/components/settings-page'
import { ChevronRightIcon } from '@chakra-ui/icons'

function AccountSignIn() {
  return (
    <Section
      title="Signing in"
      description="Update your password and improve account security."
      isAnnotated
    >
      <Card>
        <List variant="settings">
          <ListItem
            onClick={() => null}
            primary="Password"
            tertiary="Last changed January 1st 2022"
            action={<ChevronRightIcon />}
          />
          <ListItem
            onClick={() => null}
            primary="Two-factor authentication"
            tertiary="Not enabled"
            action={<ChevronRightIcon />}
          />
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
