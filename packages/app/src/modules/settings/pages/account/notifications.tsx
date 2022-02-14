import { useSnackbar } from '@saas-ui/react'
import { Page, Section } from '@saas-ui/pro'

import {
  Form,
  Field,
  DisplayField,
  FormLayout,
  Card,
  CardBody,
  CardFooter,
} from '@saas-ui/react'

export function AccountNotificationsPage() {
  return (
    <Page
      title="Notifications"
      description="Manage your notifications"
      variant="settings"
      isLoading={false}
    ></Page>
  )
}
