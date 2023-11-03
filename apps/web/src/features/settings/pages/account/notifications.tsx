import { Card, Divider, Heading, Switch, Text } from '@chakra-ui/react'
import {
  StructuredList,
  StructuredListCell,
  StructuredListHeader,
  StructuredListItem,
} from '@saas-ui/react'
import { Section, SectionBody, SectionHeader } from '@saas-ui-pro/react'

import { SettingsPage } from '@ui/lib'

interface NotificationItemProps {
  title: string
  description?: string
  isChecked?: boolean
  onChange?: (checked: boolean) => void
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { title, description, isChecked, onChange } = props
  return (
    <StructuredListItem>
      <StructuredListCell flex="1">
        <Heading size="sm" fontWeight="normal">
          {title}
        </Heading>
        {description ? (
          <Text color="muted" size="sm">
            {description}
          </Text>
        ) : null}
      </StructuredListCell>
      <StructuredListCell>
        <Switch
          isChecked={isChecked}
          onChange={(e) => onChange?.(!!e.target.value)}
        />
      </StructuredListCell>
    </StructuredListItem>
  )
}

function NotificationChannels() {
  const onDesktopChange = async () => {
    if (Notification.permission !== 'denied') {
      await Notification.requestPermission()
    }
  }

  return (
    <Section variant="annotated">
      <SectionHeader
        title="Notification channels"
        description="Where can we notify you?"
      />
      <SectionBody>
        <Card>
          <StructuredList variant="settings">
            <NotificationItem
              title="Email"
              description="Receive a daily email digest."
              isChecked={true}
            />
            <NotificationItem
              title="Desktop"
              description="Receive desktop notifications."
              onChange={onDesktopChange}
            />
          </StructuredList>
        </Card>
      </SectionBody>
    </Section>
  )
}

function NotificationTopics() {
  return (
    <Section variant="annotated">
      <SectionHeader
        title="Notification topics"
        description="Notify me when..."
      />
      <SectionBody>
        <Card>
          <StructuredList size="condensed">
            <StructuredListHeader>Contacts</StructuredListHeader>
            <NotificationItem title="A new lead is added." isChecked={true} />
            <NotificationItem
              title="An account has upgraded."
              isChecked={true}
            />
          </StructuredList>
          <Divider />
          <StructuredList size="condensed">
            <StructuredListHeader>Inbox</StructuredListHeader>
            <NotificationItem
              title="A message is assigned to me."
              isChecked={true}
            />
            <NotificationItem title="Somebody mentions me." isChecked={true} />
          </StructuredList>
        </Card>
      </SectionBody>
    </Section>
  )
}

function AccountUpdates() {
  return (
    <Section variant="annotated">
      <SectionHeader
        title="Account updates"
        description="Receive updates about Saas UI."
      />
      <SectionBody>
        <Card>
          <StructuredList variant="settings">
            <NotificationItem
              title="Product updates"
              description="Receive a weekly email with all new features and updates."
              isChecked={true}
            />
            <NotificationItem
              title="Important updates"
              description="Receive emails about important updates like security fixes, maintenance, etc."
              isChecked={true}
            />
          </StructuredList>
        </Card>
      </SectionBody>
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
