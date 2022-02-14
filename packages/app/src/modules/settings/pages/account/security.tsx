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

export function AccountSecurityPage() {
  return (
    <Page
      title="Security"
      description="Manage your account security"
      variant="settings"
      isLoading={false}
    ></Page>
  )
}
