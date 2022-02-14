import { useRef, useState, MouseEvent } from 'react'
import { useGetCurrentUserQuery } from '@app/graphql'
import { useUpdateUserMutation } from '@app/graphql'
// import { useCreateSignedAvatarUrlMutation } from '@/graphql/User/createSignedAvatarUrl.generated'
// import { useUpdateProjectMutation } from '@graphql/updateProject.generated'

import * as Yup from 'yup'
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

import { Box, Button, Skeleton, Avatar, Tooltip } from '@chakra-ui/react'

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

// import ImageUploadModal from '@/ui/ImageUpload/Modal'

function ProfileDetails({ user }: any) {
  const snackbar = useSnackbar()
  const { isLoading, mutateAsync: updateUser } = useUpdateUserMutation()

  let form
  if (!user) {
    form = <Skeleton width="100%" />
  } else {
    form = (
      <Form
        schema={schema}
        defaultValues={{
          name: user?.name,
        }}
        onSubmit={(data) => {
          updateUser({
            userId: user.id,
            name: data.name,
          }).then(() =>
            snackbar({
              description: 'Profile updated',
            }),
          )
        }}
      >
        <CardBody>
          <FormLayout>
            <Field name="name" label="Name" />
          </FormLayout>
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
    <Section title="Basic details" annotated>
      <Card>{form}</Card>
    </Section>
  )
}

function ProfileAvatar({ user }: any) {
  const snackbar = useSnackbar()
  // const [{ fetching }, updateUser] = useUpdateUserMutation()
  // const [, createSignedAvatarUrl] = useCreateSignedAvatarUrlMutation()

  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)

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

  const showModal = () => {
    setIsOpen(true)
  }

  let form
  if (!user) {
    form = <Skeleton width="100%" />
  } else {
    form = (
      <Form
        schema={schema}
        defaultValues={{
          name: user?.name,
        }}
        onSubmit={(data) => {
          // return createSignedAvatarUrl({
          //   fileName: 'test.png',
          //   size: '1231232',
          //   type: 'image/png',
          // }).then(({ url }: any) =>
          //   snackbar({
          //     description: url,
          //   }),
          // )
        }}
      >
        <CardBody>
          <FormLayout>
            <Tooltip label="Edit avatar">
              <Avatar
                name={user.name}
                src={previewUrl}
                size="xl"
                onClick={showModal}
                cursor="pointer"
              />
            </Tooltip>
            {/* <ImageUploadModal
              isOpen={isOpen}
              onClose={onClose}
              title="Upload avatar"
            /> */}
          </FormLayout>
        </CardBody>
      </Form>
    )
  }
  return (
    <Section title="Avatar" annotated>
      <Card>{form}</Card>
    </Section>
  )
}

export function AccountProfilePage() {
  const { isLoading, data } = useGetCurrentUserQuery()

  const user = data?.currentUser

  return (
    <Page title="Profile" variant="settings" isLoading={isLoading}>
      <ProfileDetails user={user} />
      <ProfileAvatar user={user} />
    </Page>
  )
}
