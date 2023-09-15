import { createStore as createVanilla } from 'zustand/vanilla'
import { Flags, Segment, UserAttributes } from './types'

export interface FeaturesStore {
  isReady: boolean
  attr?: UserAttributes
  segments: Segment[]
  flags: Flags
  identify: (attr: UserAttributes) => void
  hasFeatures: (ids: string[], value: any) => Record<string, any>
}

export const store = createVanilla<FeaturesStore>((set, get) => ({
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
