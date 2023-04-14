import { z } from 'zod'
import { getOrganization, Organization, updateOrganization } from '@api/client'
import { Button, Card, CardBody, CardFooter } from '@chakra-ui/react'
import { Section, useTenant } from '@saas-ui-pro/react'
import { FormLayout, useSnackbar } from '@saas-ui/react'
import { Form, SettingsPage } from '@ui/lib'
import { useMutation, useQuery } from '@tanstack/react-query'

const schema = z.object({
  name: z.string().min(2, 'Too short').max(25, 'Too long').describe('Name'),
  email: z
    .string()
    .email({ message: 'Please enter your email address' })
    .describe('Email'),
})

interface OrganizationDetailsProps {
  organization?: Organization | null
}

function OrganizationDetails({ organization }: OrganizationDetailsProps) {
  const snackbar = useSnackbar()
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: updateOrganization,
  })

  let form
  if (organization) {
    form = (
      <Form
        schema={schema}
        defaultValues={{
          name: organization.name,
          email: organization.email,
        }}
        onSubmit={(data) => {
          return mutateAsync({
            id: organization.id,
            name: data.name,
          }).then(() =>
            snackbar({
              description: 'Updated the organization',
            }),
          )
        }}
      >
        {({ Field }) => (
          <>
            <CardBody>
              <FormLayout>
                <Field name="name" label="Organization name" />
                <Field name="email" label="Email address" />
              </FormLayout>
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
          </>
        )}
      </Form>
    )
  }
  return (
    <Section
      title="Organization details"
      description="Basic details about your organization."
      isAnnotated
    >
      <Card>{form}</Card>
    </Section>
  )
}

export function OrganizationSettingsPage() {
  const tenant = useTenant()

  const { data, isLoading, error } = useQuery({
    queryKey: ['Organization', tenant],
    queryFn: () => getOrganization({ slug: tenant }),
  })

  const organization = data?.organization

  return (
    <SettingsPage
      isLoading={isLoading}
      title="Organization"
      description="Manage your organization settings"
    >
      <OrganizationDetails organization={organization} />
    </SettingsPage>
  )
}
