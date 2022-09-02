import { useBreakpointValue } from '@chakra-ui/react'
import { BackButton, Page, PageProps, useSplitPage } from '@saas-ui/pro'

export function InboxViewPage(props: PageProps) {
  const { onClose } = useSplitPage()

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const nav = isMobile && <BackButton onClick={onClose} />

  return <Page nav={nav} {...props}></Page>
}
