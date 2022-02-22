import { Switch } from '@chakra-ui/react'
import { Card, Divider, List, ListHeader, ListItem } from '@saas-ui/react'
import { Section } from '@saas-ui/pro'

import { SettingsPage } from '@modules/core/components/settings-page'

function NotificationChannels() {
  const onDesktopChange = async () => {
    if (Notification.permission !== 'denied') {
      await Notification.requestPermission()
    }
  }

  return (
    <Section
      title="Notification channels"
      description="Where can we notify you?"
      isAnnotated
    >
      <Card>
        <List variant="settings">
          <ListItem primary="Email" secondary="Receive a dialy email digest." />
          <ListItem
            primary="Desktop"
            secondary="Receive desktop notifications."
            action={<Switch onChange={onDesktopChange} />}
          />
        </List>
      </Card>
    </Section>
  )
}

function NotificationTopics() {
  return (
    <Section
      title="Notification topics"
      description="Notify me when..."
      isAnnotated
    >
      <Card>
        <List size="condensed">
          <ListHeader>Contacts</ListHeader>
          <ListItem
            primary="A new lead is added."
            action={<Switch defaultIsChecked />}
          />
          <ListItem
            primary="An account has upgraded."
            action={<Switch defaultIsChecked />}
          />
        </List>
        <Divider />
        <List size="condensed">
          <ListHeader>Inbox</ListHeader>
          <ListItem
            primary="A message is assigned to me."
            action={<Switch defaultIsChecked />}
          />
          <ListItem
            primary="Somebody mentions me."
            action={<Switch defaultIsChecked />}
          />
        </List>
      </Card>
    </Section>
  )
}

function AccountUpdates() {
  return (
    <Section
      title="Account updates"
      description="Receive updates about Saas UI."
      isAnnotated
    >
      <Card>
        <List variant="settings">
          <ListItem
            primary="Product updates"
            secondary="Receive a weekly email with all new features and updates."
            action={<Switch defaultIsChecked />}
          />
          <ListItem
            primary="Important updates"
            secondary="Receive emails about important updates like security fixes, maintenance, etc."
            action={<Switch defaultIsChecked />}
          />
        </List>
      </Card>
    </Section>
  )
}

export function AccountNotificationsPage() {
  return (
    <SettingsPage
      title="Notifications"
      description="Manage how and where you want to be notified."
    >
      <NotificationChannels />
      <NotificationTopics />
      <AccountUpdates />
    </SettingsPage>
  )
}
