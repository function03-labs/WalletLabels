import React from 'react'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'
import createContext from 'zustand/context'

import { Segment, UserAttributes, Flags } from './types'

export interface FeaturesOptions {
  segments: Segment[]
  attr?: UserAttributes
}

interface FeaturesStore {
  isReady: boolean
  attr?: UserAttributes
  segments: Segment[]
  flags: Flags
  identify: (attr: UserAttributes) => void
  hasFeatures: (ids: string[], value: any) => Record<string, any>
}

const store = createVanilla<FeaturesStore>((set, get) => ({
  /**
   * Indicates if the store is initialized.
   */
  isReady: false,
  /**
   * The user attributes.
   */
  attr: {},
  /**
   * Feature flags matched to the user attributes.
   */
  flags: [],
  /**
   * Segments with attributes and features
   */
  segments: [],
  /**
   * Identify a user.
   */
  identify: (attr) => {
    const segments = matchSegments(get().segments, attr)
    const flags = flagsFromSegments(segments)
    set({ attr, flags })
  },
  /**
   * Check if one or more features are enabled.
   */
  hasFeatures: (ids, value) => {
    const flags = get().flags
    return ids?.reduce<Record<string, any>>((memo, id) => {
      if ((typeof value === 'undefined' && flags[id]) || flags[id] === value) {
        memo[id] = flags[id]
      }

      return memo
    }, {})
  },
}))

const { Provider, useStore } = createContext<FeaturesStore>()

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

  return <Provider createStore={() => create(store)}>{children}</Provider>
}

export const useFeatures = () => {
  const store = useStore()

  return store
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

const matchSegments = (segments: Segment[], attr: UserAttributes) => {
  return segments.filter((segment) => {
    return segment.attr.every(({ key, value }) => {
      if (Array.isArray(attr[key])) {
        return attr[key].includes(value)
      }

      return attr[key] === value
    })
  })
}

const flagsFromSegments = (segments: Segment[]) => {
  return segments.reduce<Flags>((memo, { features }) => {
    features.forEach((feature) => {
      if (typeof feature === 'string') {
        memo[feature] = true
      } else {
        memo[feature.id] = feature.value
      }
    })
    return memo
  }, {})
}
