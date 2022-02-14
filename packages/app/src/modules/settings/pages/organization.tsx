import { useRouter } from 'next/router'

import { useGetOrganizationQuery } from '@app/graphql'

import { useState } from 'react'
import {
  useInviteToOrganizationMutation,
  useRemoveUserFromOrganizationMutation,
} from '@app/graphql'

import { useUpdateOrganizationMutation } from '@app/graphql'

import * as Yup from 'yup'
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

import { FiX, FiCopy } from 'react-icons/fi'

import {
  Box,
  Button,
  Input,
  InputGroup,
  Skeleton,
  Avatar,
  Tag,
} from '@chakra-ui/react'

import { Page, Section } from '@saas-ui/pro'

import {
  Card,
  CardBody,
  CardFooter,
  List,
  Form,
  Field,
  Loading,
  InputRightButton,
  useSnackbar,
} from '@saas-ui/react'

function OrganizationDetails({ organization }: any) {
  const snackbar = useSnackbar()
  const { isLoading, mutateAsync: updateOrganization } =
    useUpdateOrganizationMutation()

  let form
  if (!organization) {
    form = <Skeleton width="100%" />
  } else {
    form = (
      <Form
        schema={schema}
        defaultValues={{
          name: organization?.name,
        }}
        onSubmit={(data) => {
          return updateOrganization({
            organizationId: organization.id,
            name: data.name,
          }).then(() =>
            snackbar({
              description: 'Updated the project',
            }),
          )
        }}
      >
        <CardBody>
          <Field name="name" label="Organization name" />
        </CardBody>
        <CardFooter>
          <Button colorScheme="primary" type="submit" isLoading={isLoading}>
            Save
          </Button>
        </CardFooter>
      </Form>
    )
  }
  return (
    <Section title="Organization details" annotated>
      <Card>{form}</Card>
    </Section>
  )
}

export function OrganizationSettingsPage() {
  const router = useRouter()
  const { slug } = router.query

  const { data, isLoading, error } = useGetOrganizationQuery({
    slug: String(slug),
  })

  const organization = data?.organization

  return (
    <Page
      isLoading={isLoading}
      variant="settings"
      title="Organization"
      description="Manage your project settings"
    >
      <OrganizationDetails organization={organization} />
    </Page>
  )
}
