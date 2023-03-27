import { QueryClient } from '@tanstack/react-query'

/**
 * We create a single instance of the query client to be used throughout the app.
 * This allows us to the share the same query client between react and for example the filter definitions.
 */
export const queryClient = new QueryClient()
