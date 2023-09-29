import * as React from 'react'

import { usePathname, useParams as useRouterParams } from 'next/navigation'

export { usePathname, useRouter } from 'next/navigation'

/**
 * Returns the current router query
 * @returns ParsedUrlQuery
 */
export const useParams = () => {
  return useRouterParams()
}

export interface UseActivePathOptions {
  /**
   * Set to false to match the first parth of the path.
   * eg: /contacts will match /contacts/people
   */
  end?: boolean
}

/**
 * Matches the given path to the current active path.
 * @param path string
 * @param options UseActivePathOptions
 * @returns boolean
 */
export function useActivePath(
  path: string,
  options: UseActivePathOptions = {},
) {
  const { end = true } = options
  const pathname = usePathname()
  return !!React.useMemo(
    () => pathname.match(new RegExp(`${path}${end ? '$' : ''}`)),
    [pathname, path, options],
  )
}

export const useLocation = () => {
  return {
    pathname: usePathname(),
  }
}
