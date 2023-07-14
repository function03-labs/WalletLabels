/**
 * The API client is a wrapper around the API implementation and allows us to easily switch between different API implementations.
 *
 * For example, the demo app uses @api/mocks by default. Which returns fake data and is useful for testing and
 * development and is used in the demo application.
 *
 * The export could be your own api client, eg @api/graphql-client or @api/supabase-client.
 */
export * from '@api/mocks'
