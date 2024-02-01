import type { Router } from 'next/dist/client/router'
import { AppInitialProps } from 'next/dist/shared/lib/utils'
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
