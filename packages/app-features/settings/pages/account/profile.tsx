import { useRef, useState } from 'react'
import { useGetCurrentUserQuery } from '@app/graphql'
import { useUpdateUserMutation } from '@app/graphql'

import * as Yup from 'yup'
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
  email: Yup.string().required().email().label('Email'),
})

import {
  Button,
  FormControl,
  FormLabel,
  Avatar,
  Tooltip,
} from '@chakra-ui/react'

import {
  Form,
  Field,
  FormLayout,
  Card,
  CardBody,
  useSnackbar,
} from '@saas-ui/react'

import { Section } from '@saas-ui/pro'

import { SettingsPage } from '@app/features/core/components/settings-page'

function ProfileDetails({ user }: any) {
  const snackbar = useSnackbar()
  const { isLoading, mutateAsync: updateUser } = useUpdateUserMutation()

  return (
    <Section
      title="Basic details"
      description="Update your personal information."
      isAnnotated
    >
      <Card>
        <Form
          schema={schema}
          defaultValues={{
            name: user?.name,
            email: user?.email,
          }}
          onSubmit={(data) => {
            updateUser({
              id: user.id,
              name: data.name,
            }).then(() =>
              snackbar.success({
                description: 'Profile updated',
              }),
            )
          }}
        >
          <CardBody>
            <FormLayout>
              <ProfileAvatar user={user} />
              <Field name="name" label="Name" />
              <Field name="email" label="Email" />
              <Button colorScheme="primary" type="submit" isLoading={isLoading}>
                Save
              </Button>
            </FormLayout>
          </CardBody>
        </Form>
      </Card>
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
  const { isLoading, data } = useGetCurrentUserQuery()

  const user = data?.currentUser

  return (
    <SettingsPage
      title="Profile"
      description="Manage your profile"
      isLoading={isLoading}
    >
      <ProfileDetails user={user} />
    </SettingsPage>
  )
}
