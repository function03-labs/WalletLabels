import * as React from 'react'

import { useRouter } from 'next/router'

const parseAsPath = (asPath: string) => {
  const [, pathname, search, hash] =
    asPath.match(/([^#?\s]+)(\??[^#]*)?(#.*)?$/) || []

  return { pathname, search, hash }
}

/**
 * Returns the current router query
 * @returns ParsedUrlQuery
 */
export const useParams = () => {
  const router = useRouter()
  return router.query
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
  const location = useLocation()
  return !!React.useMemo(
    () => location?.pathname.match(new RegExp(`${path}${end ? '$' : ''}`)),
    [location?.pathname, path, options],
  )
}

export const useLocation = () => {
  const router = useRouter()

  const location = React.useMemo(
    () => parseAsPath(router.asPath),
    [router.asPath],
  )

  return location
}
