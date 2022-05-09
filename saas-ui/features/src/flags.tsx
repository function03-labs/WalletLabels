import * as React from 'react'

import { runIfFn, __DEV__ } from '@chakra-ui/utils'

import { useFlag, useFlags } from './provider'

export interface FlagProps {
  children: React.ReactNode | (({ flag }: { flag: any }) => React.ReactElement)
  flag: string
  value?: any
  fallback?: React.ReactNode
}

/**
 * Conditionally render children based on a single feature flag.
 */
export const Flag: React.FC<FlagProps> = (props) => {
  const { children, flag: id, value = true, fallback } = props

  const flag = useFlag(id)

  if (flag && flag === value) {
    return <>{runIfFn(children, { flag })}</>
  } else if (fallback) {
    return <>{fallback}</>
  }

  return null
}

if (__DEV__) {
  Flag.displayName = 'Flag'
}

export interface FlagsProps {
  children: React.ReactNode | (({ flag }: { flag: any }) => React.ReactElement)
  flags: string[]
  value?: any
  fallback?: React.ReactNode
}

/**
 * Conditionally render children based on multiple feature flags.
 */
export const Flags: React.FC<FlagsProps> = (props) => {
  const { children, flags: ids, fallback } = props

  const flags = useFlags()

  const enabled = ids.every((id) => flags[id])

  if (enabled) {
    return <>{children}</>
  } else if (fallback) {
    return <>{fallback}</>
  }

  return null
}

if (__DEV__) {
  Flags.displayName = 'Flags'
}
