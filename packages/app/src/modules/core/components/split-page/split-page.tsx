import { Flex } from '@chakra-ui/react'

import { Page, PageProps } from '@saas-ui/pro'

export interface SplitPageProps extends PageProps {
  content?: React.ReactNode
}

export const SplitPage = (props: SplitPageProps) => {
  const { content, ...rest } = props
  return (
    <Flex flexDirection="row" as="main" flex="1">
      <Page
        as="div"
        width="30%"
        height="100%"
        maxW="360px"
        borderRightWidth="1px"
        {...rest}
      />
      {content}
    </Flex>
  )
}
