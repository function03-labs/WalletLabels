import type { CompletePrivateRouteInfo } from 'next/dist/shared/lib/router/router'
import type { Router } from 'next/dist/client/router'
import type { NextComponentType, NextPage, NextPageContext } from 'next'
import { AppInitialProps, AppPropsType } from 'next/dist/shared/lib/utils'
import { ComponentType } from 'react'

declare module 'next/app' {
  export declare type AppProps = AppInitialProps<Record<string, any>> & {
    router: Router
    Component: ComponentType<Props> & {
      layout?: string | JSX.Element
      isPublic?: boolean
    }
  }
}
