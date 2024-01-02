import React from 'react'

export const useMergeRefs = <T>(
  ...refs: (React.Ref<T> | React.ForwardedRef<T> | null)[]
): React.Ref<T> => {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) return null
    return (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref != null) {
          ;(ref as React.MutableRefObject<T | null>).current = node
        }
      })
    }
  }, [...refs])
}
