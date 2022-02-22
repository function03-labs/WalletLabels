import { useGetOrganizationQuery } from '@app/graphql'

import {
  useUpdateOrganizationMutation,
  GetOrganizationQuery,
} from '@app/graphql'

import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

import { Page, Section, useTenant } from '@saas-ui/pro'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Field,
  useSnackbar,
} from '@saas-ui/react'

interface OrganizationDetailsProps {
  organization?: GetOrganizationQuery['organization'] | null
}

function OrganizationDetails({ organization }: OrganizationDetailsProps) {
  const snackbar = useSnackbar()
  const { isLoading, mutateAsync: updateOrganization } =
    useUpdateOrganizationMutation()

  let form
  if (organization) {
    form = (
      <Form
        schema={schema}
        defaultValues={{
          name: organization.name,
        }}
        onSubmit={(data) => {
          return updateOrganization({
            organizationId: organization.id,
            name: data.name,
          }).then(() =>
            snackbar({
              description: 'Updated the organization',
            }),
          )
        }}
      >
        <CardBody>
          <Field name="name" label="Organization name" />
        </CardBody>
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="primary"
            type="submit"
            isLoading={isLoading}
          >
            Save
          </Button>
        </CardFooter>
      </Form>
    )
  }
  return (
    <Section title="Organization details">
      <Card>{form}</Card>
    </Section>
  )
}

export function OrganizationSettingsPage() {
  const tenant = useTenant()

  const { data, isLoading, error } = useGetOrganizationQuery({
    slug: tenant,
  })

  const organization = data?.organization

  return (
    <Page
      isLoading={isLoading}
      variant="settings"
      title="Organization"
      description="Manage your organization settings"
    >
      <OrganizationDetails organization={organization} />
    </Page>
  )
}
