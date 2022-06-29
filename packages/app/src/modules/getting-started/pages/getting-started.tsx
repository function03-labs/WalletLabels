import * as React from 'react'
import * as Yup from 'yup'

import { Container, Text, ModalFooter, useDisclosure } from '@chakra-ui/react'

import { Field, FormLayout, SubmitButton, FormDialog } from '@saas-ui/react'
import { Page } from '@saas-ui/pro'

import { useCreateOrganizationMutation } from '@app/graphql'
import { useNavigate } from '@saas-ui/router'

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

export function GettingStartedPage(props: any) {
  const navigate = useNavigate()
  const { mutateAsync: createOrganization } = useCreateOrganizationMutation()

  const disclosure = useDisclosure()

  React.useLayoutEffect(() => {
    disclosure.onOpen()
  })

  return (
    <Page title="Getting started" fullWidth>
      <Container py="40">
        <FormDialog
          title="Let's get you set up"
          hideCloseButton
          hideOverlay
          isCentered
          motionPreset="slideInBottom"
          schema={schema}
          defaultValues={{
            name: '',
          }}
          footer={
            <ModalFooter>
              <SubmitButton
                label="Create organization"
                size="md"
                width="full"
              />
            </ModalFooter>
          }
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
              .then((slug) => navigate(`/app/${slug}`))
          }}
          {...disclosure}
        >
          <FormLayout mb="2">
            <Text fontSize="lg">
              We need a little more information before continuing.
            </Text>

            <Field name="name" label="Organization name" />
          </FormLayout>
        </FormDialog>
      </Container>
    </Page>
  )
}
