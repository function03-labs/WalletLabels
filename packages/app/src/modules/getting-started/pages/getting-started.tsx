import * as React from 'react'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

import { Container, Text, useDisclosure } from '@chakra-ui/react'

import { Form, Field, FormLayout, SubmitButton, Modal } from '@saas-ui/react'
import { Page } from '@saas-ui/pro'

import { useCreateOrganizationMutation } from '@app/graphql'

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

export function GettingStartedPage(props: any) {
  const router = useRouter()

  const { mutateAsync: createOrganization } = useCreateOrganizationMutation()

  const ref = React.useRef<HTMLFormElement>(null)

  const handleSubmit = () => {
    ref.current?.requestSubmit()
  }

  const disclosure = useDisclosure()

  React.useLayoutEffect(() => {
    disclosure.onOpen()
  })

  return (
    <Page title="Getting started" fullWidth>
      <Container py="40">
        <Modal
          title="Let's get you set up"
          hideCloseButton
          hideOverlay
          isCentered
          motionPreset="slideInBottom"
          {...disclosure}
        >
          <Form
            ref={ref}
            schema={schema}
            defaultValues={{
              name: '',
            }}
            onSubmit={(data) => {
              return createOrganization({ name: data.name })
                .then((result) => {
                  const slug = result?.createOrganization?.slug
                  if (slug) {
                    disclosure.onClose()
                    return slug
                  } else {
                    throw new Error('Could not create a new organization.')
                  }
                })
                .then((slug) => router.push(`/app/${slug}`))
            }}
          >
            <FormLayout mb="2">
              <Text fontSize="lg">
                We need a little more information before continuing.
              </Text>

              <Field name="name" label="Organization name" />

              <SubmitButton
                label="Create organization"
                isPrimary
                onClick={handleSubmit}
                size="md"
                width="full"
              />
            </FormLayout>
          </Form>
        </Modal>
      </Container>
    </Page>
  )
}
