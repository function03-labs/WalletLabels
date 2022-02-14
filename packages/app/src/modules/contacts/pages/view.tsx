import { useRouter } from 'next/router'

// import { useGetContactQuery } from '@app/graphql'

import { Skeleton } from '@chakra-ui/react'

import * as Yup from 'yup'

import { Page, Section } from '@saas-ui/pro'
import { Card, Form } from '@saas-ui/react'

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

export function ContactsViewPage() {
  const router = useRouter()
  const { id } = router.query

  // const {data, isLoading, error} = useGetContactQuery({
  //   variables: {
  //     id: String(id),
  //   },
  // })

  return (
    <Page title={<Skeleton width="100px" />} isLoading={true}>
      <Section title="Contact details" annotated>
        <Card>
          <Form
            defaultValues={{}}
            schema={schema}
            onSubmit={() => Promise.resolve()}
          />
        </Card>
      </Section>
    </Page>
  )
}
