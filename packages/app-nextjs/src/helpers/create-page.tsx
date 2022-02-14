import React from 'react'
import Head from 'next/head'

interface CreatePageProps {
  title?: string
  layout?: React.ReactNode
  isPublic?: boolean
  renderComponent: React.FC
}

interface PageFC extends React.FC {
  layout?: React.ReactNode
  isPublic?: boolean
}

/**
 * @todo implement features/roles/auth/layouts/data loading?
 *
 * Inspired by
 * https://blog.rstankov.com/structuring-next-js-application/
 */
export const createPage = (props: CreatePageProps): PageFC => {
  const { title, layout, isPublic, renderComponent: PageComponent } = props

  const Page: PageFC = (props) => {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <PageComponent />
      </>
    )
  }

  Page.layout = layout
  Page.isPublic = isPublic

  return Page
}
