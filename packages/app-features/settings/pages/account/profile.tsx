import { useRef, useState } from 'react'

import { z } from 'zod'

const schema = z.object({
  firstName: z
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .describe('First name'),
  lastName: z
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .describe('Last name'),
  email: z
    .string()
    .email({ message: 'Please enter your email address' })
    .describe('Email'),
})

import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Avatar,
  Tooltip,
} from '@chakra-ui/react'

import { FormLayout, useSnackbar } from '@saas-ui/react'
import { Section, SectionBody, SectionHeader } from '@saas-ui-pro/react'
import { Form, SettingsPage } from '@ui/lib'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCurrentUser, updateUser, User } from '@api/client'

function ProfileDetails({ user }: { user: User }) {
  const snackbar = useSnackbar()
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: updateUser,
  })

  return (
    <Section variant="annotated">
      <SectionHeader
        title="Basic details"
        description="Update your personal information."
      />
      <SectionBody>
        <Card>
          <Form
            schema={schema}
            defaultValues={{
              firstName: user?.firstName,
              lastName: user?.lastName,
              email: user?.email,
            }}
            onSubmit={(data: any) => {
              // @todo fix types
              mutateAsync({
                id: user.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
              }).then(() =>
                snackbar.success({
                  description: 'Profile updated',
                }),
              )
            }}
          >
            {(
              { Field }: any, // @todo fix types
            ) => (
              <CardBody>
                <FormLayout>
                  <ProfileAvatar user={user} />
                  <Field name="firstName" label="First name" />
                  <Field name="lastName" label="Last name" />
                  <Field name="email" label="Email" />
                  <Button
                    colorScheme="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Save
                  </Button>
                </FormLayout>
              </CardBody>
            )}
          </Form>
        </Card>
      </SectionBody>
    </Section>
  )
}

function ProfileAvatar({ user }: any) {
  const snackbar = useSnackbar()

  const [previewUrl, setPreviewUrl] = useState<string | undefined>()
  const ref = useRef<HTMLInputElement>()

  const selectFile = () => {
    ref.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files

    if (files?.length) {
      setPreviewUrl(URL.createObjectURL(files[0]))
    }
  }

  return (
    <FormControl>
      <FormLabel>Profile picture</FormLabel>
      <Tooltip label="Upload a picture">
        <Avatar
          name={user.name}
          src={previewUrl || user.avatar}
          size="lg"
          onClick={selectFile}
          cursor="pointer"
        />
      </Tooltip>
    </FormControl>
  )
}

export function AccountProfilePage() {
  const { isLoading, data } = useQuery({
    queryKey: ['CurrentUser'],
    queryFn: getCurrentUser,
  })

  const user = data?.currentUser

  return (
    <SettingsPage
      title="Profile"
      description="Manage your profile"
      isLoading={isLoading}
    >
      {user && <ProfileDetails user={user} />}
    </SettingsPage>
  )
}
