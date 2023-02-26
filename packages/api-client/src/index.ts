/**
 * The API client is a wrapper around the API implementation and allows us to easily switch between different API implementations.
 *
 * For example, the demo app uses @api/mocks by default.
 * The export can be switched to @api/supabase or @api/graphql to use a different API implementation.
 */
export * from '@api/mocks'
