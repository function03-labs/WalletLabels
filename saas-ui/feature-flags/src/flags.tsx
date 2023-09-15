'use client'

import * as React from 'react'

import { runIfFn } from '@chakra-ui/utils'

import { useHasFeature } from './provider'

import { Flags } from './types'

export interface HasProps {
  /**
   * One or more flags to match.
   */
  feature: string | string[]
  /**
   * Match the supplied flags to this value.
   * Matches all truthy values by default.
   */
  value?: any
  /**
   * Inverse matching, eg will be valid when no flags match.
   */
  not?: boolean
  /**
   * Match all or some flags.
   * @default true
   */
  exact?: boolean
  /**
   * Renders the result is invalid.
   */
  fallback?: React.ReactNode
  /**
   * Children will be rendered when the result is valid.
   */
  children:
    | React.ReactNode
    | (({ flags }: { flags: Flags }) => React.ReactElement)
}

/**
 * Conditionally render children based on one or more feature flag values.
 */
export const Has: React.FC<HasProps> = (props) => {
  const { children, feature, value, not, exact, fallback } = props

  const ids = typeof feature === 'string' ? [feature] : feature

  if (!ids?.length) {
    return null
  }

  const flags = useHasFeature(ids, value)

  const matches = Object.keys(flags).length

  const enabled = exact === false ? !!matches : ids.length === matches

  if (enabled || (not && !enabled)) {
    return <>{runIfFn(children, { flags })}</>
  } else if (fallback) {
    return <>{fallback}</>
  }

  return null
}

Has.displayName = 'Has'
