import * as React from 'react'
import { z } from 'zod'
import { Container, Text, ModalFooter, useDisclosure } from '@chakra-ui/react'

import { Field, FormLayout, SubmitButton, FormDialog } from '@saas-ui/react'
import { Page } from '@saas-ui-pro/react'

import { useMutation } from '@tanstack/react-query'
import { createOrganization } from '@api/client'
import { useRouter } from 'next/router'

const schema = z.object({
  name: z.string().min(2, 'Too short').max(25, 'Too long').describe('Name'),
})

export function GettingStartedPage(props: any) {
  const { push } = useRouter()
  const { mutateAsync } = useMutation({
    mutationFn: createOrganization,
  })

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
              <SubmitButton size="md" width="full">
                Create organization
              </SubmitButton>
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
              .then((slug) => push(`/app/${slug}`))
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
