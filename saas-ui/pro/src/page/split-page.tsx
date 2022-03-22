import * as React from 'react'

import { chakra, useStyleConfig } from '@chakra-ui/react'

import { Page, PageProps } from './page'

export interface SplitPageProps extends PageProps {
  content?: React.ReactNode
}

export const SplitPage: React.FC<SplitPageProps> = (props) => {
  const { content, width = '30%', maxW = '360px', ...rest } = props

  const styles = useStyleConfig('SplitPage', props)

  const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    ...styles,
  }

  return (
    <chakra.main __css={containerStyles} className="saas-split-page__container">
      <Page
        as="div"
        width={width}
        maxW={maxW}
        height="100%"
        borderRightWidth="1px"
        {...rest}
      />
      {content}
    </chakra.main>
  )
}
