import { graphql as executeGraphQL, Source } from 'graphql'
import { schema } from '@app/mock-graphql'
import { oneLine } from 'common-tags'

interface Options {
  context?: {
    user?: any
  }
  variables?: Record<string, unknown>
}

/**
 * Execute a GraphQL query for unit testing
 *
 * @example
 * ```ts
 * expect(await request(graphql`{ currentUser { id } }`)).toMatchSnapshot()
 * ```
 * ```ts
 * // To authenticate a user:
 * expect(await request(graphql`{ currentUser { id } }`, {
 *   context: {
 *     user: testData.users[0]
 *   }
 * })).toMatchSnapshot()
 * ```
 */
export const request = (
  query: string | Source,
  { context, variables }: Options = {},
) => {
  return executeGraphQL(schema, query, undefined, context || {}, variables)
}

/**
 * No-op graphql tagged template literal for tests to trigger Prettier's code formatted and VSCode's syntax highlighting
 * @example
 * ```ts
 * expect(await request(graphql`{ currentUser { id } }`)).toMatchSnapshot()
 * ```
 */
export const graphql = oneLine
