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

export function AccountApiPage() {
  return (
    <Page
      title="Api"
      description="Access our api"
      variant="settings"
      isLoading={false}
    ></Page>
  )
}
