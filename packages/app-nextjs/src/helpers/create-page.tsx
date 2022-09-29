import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

export interface LayoutProps {
  layout?: React.ReactNode
  isPublic?: boolean
}

export interface CreatePageProps<TPageProps extends object>
  extends LayoutProps {
  title?: string
  renderComponent: React.FC<PageProps & TPageProps>
}

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> &
  LayoutProps

export interface NavigateOptions {
  replace?: boolean
}

export interface PageProps {
  query: Record<string, any>
  locale?: string
}

/**
 * @todo implement features/roles/auth/layouts/data loading?
 *
 * Inspired by
 * https://blog.rstankov.com/structuring-next-js-application/
 */
export const createPage = <TPageProps extends object>(
  props: CreatePageProps<TPageProps>,
) => {
  const { title, layout, isPublic, renderComponent: PageComponent } = props

  const Page: NextPageWithLayout<TPageProps> = (props) => {
    const router = useRouter()

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <PageComponent query={router.query} locale={router.locale} {...props} />
      </>
    )
  }

  Page.layout = layout
  Page.isPublic = isPublic

  return Page
}
