import Link from 'next/link'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'

import { Container } from '@chakra-ui/layout'

import { useAuth } from '@saas-ui/auth'

import { Form, Field, FormLayout, Button, Card, CardBody } from '@saas-ui/react'
import { Page, Section } from '@saas-ui/pro'

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

  const ref = useRef<HTMLFormElement>(null)

  const handleSubmit = () => {
    ref.current?.requestSubmit()
  }

  return (
    <Page title="Getting started" fullWidth>
      <Container py="40">
        <Card
          title="Let's get you set up"
          subtitle="We need a little more information before continueing."
        >
          <CardBody>
            <Form
              ref={ref}
              schema={schema}
              defaultValues={{
                name: '',
              }}
              onSubmit={(data) => {
                return createOrganization({ name: data.name }).then(
                  (result) => {
                    const slug = result?.createOrganization?.slug
                    if (slug) {
                      router.push(`/app/${slug}`)
                    }
                  },
                )
              }}
            >
              <FormLayout>
                <Field name="name" label="Organization name" />

                <Button
                  label="Create organization"
                  isPrimary
                  onClick={handleSubmit}
                  size="md"
                  width="full"
                />
              </FormLayout>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </Page>
  )
}
