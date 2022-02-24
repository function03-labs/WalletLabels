import { useRouter } from 'next/router'

// import { useGetContactQuery } from '@app/graphql'

import { Skeleton } from '@chakra-ui/react'

import * as Yup from 'yup'

import { Page, Section } from '@saas-ui/pro'
import { Card, CardBody, Form } from '@saas-ui/react'

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

export function ContactsViewPage() {
  // const {data, isLoading, error} = useGetContactQuery({
  //   variables: {
  //     id: String(id),
  //   },
  // })

  return (
    <Page title="Contact" variant="hero">
      <Section title="Contact details" isAnnotated>
        <Card>
          <CardBody>Todo...</CardBody>
        </Card>
      </Section>
    </Page>
  )
}
