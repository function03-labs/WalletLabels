import { Switch } from '@chakra-ui/react'
import { Card, Divider, List, ListHeader, ListItem } from '@saas-ui/react'
import { Section } from '@saas-ui/pro'

import { SettingsPage } from '@app/features/core/components/settings-page'

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
          <ListItem
            primary="Email"
            secondary="Receive a dialy email digest."
            action={<Switch />}
          />
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
            action={<Switch defaultChecked />}
          />
          <ListItem
            primary="An account has upgraded."
            action={<Switch defaultChecked />}
          />
        </List>
        <Divider />
        <List size="condensed">
          <ListHeader>Inbox</ListHeader>
          <ListItem
            primary="A message is assigned to me."
            action={<Switch defaultChecked />}
          />
          <ListItem
            primary="Somebody mentions me."
            action={<Switch defaultChecked />}
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
            action={<Switch defaultChecked />}
          />
          <ListItem
            primary="Important updates"
            secondary="Receive emails about important updates like security fixes, maintenance, etc."
            action={<Switch defaultChecked />}
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
