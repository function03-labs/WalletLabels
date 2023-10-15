'use client'

import React from 'react'
import { useStore } from 'zustand'

import { Segment, UserAttributes, Flags } from './types'
import { store } from './store'

export interface FeaturesOptions {
  segments: Segment[]
  attr?: UserAttributes
}

const FeaturesContext = React.createContext<typeof store | null>(null)

const useFeaturesContext = () => React.useContext(FeaturesContext)

export interface FeaturesProviderProps {
  value?: FeaturesOptions
  children: React.ReactNode
}

export const FeaturesProvider: React.FC<FeaturesProviderProps> = (props) => {
  const { children, value } = props

  React.useEffect(() => {
    if (value) {
      initFeatures(value)
    }
  }, [value])

  return (
    <FeaturesContext.Provider value={store}>
      {children}
    </FeaturesContext.Provider>
  )
}

export const useFeatures = () => {
  const context = useFeaturesContext()

  if (!context) {
    throw new Error(
      'Features context missing, did you wrap your app with FeaturesProvider?',
    )
  }

  return useStore(context)
}

/**
 * Check if the current identified user has one or more features.
 */
export const useHasFeature = (
  feature: string | string[] = [],
  value = true,
) => {
  const ids = typeof feature === 'string' ? [feature] : feature

  const { hasFeatures, flags } = useFeatures()

  return React.useMemo(() => {
    return hasFeatures(ids, value)
  }, [flags, ids])
}

/**
 * @deprecated Use useHasFeature instead
 */
export const useHasFlags = useHasFeature

export const useFlags = () => {
  const { flags } = useFeatures()
  return flags
}

/**
 *
 * @param id The feature id
 * @returns The feature value
 */
export const useFlag = (id: string) => {
  const { flags } = useFeatures()
  return flags[id]
}

export default store

const initFeatures = (options: FeaturesOptions) => {
  store.setState({ segments: options.segments, isReady: true })

  if (options.attr) {
    store.getState().identify(options.attr)
  }
}
