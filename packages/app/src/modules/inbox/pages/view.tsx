import { useRouter } from 'next/router'

import { Page, PageProps } from '@saas-ui/pro'
import { EmptyState } from '@saas-ui/react'

export function InboxViewPage(props: PageProps) {
  const router = useRouter()
  const { id } = router.query

  return <Page {...props}></Page>
}
