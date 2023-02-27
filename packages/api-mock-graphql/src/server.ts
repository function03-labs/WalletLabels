import { setupServer } from 'msw/node'

import { handlers } from './handlers'

export const server = typeof window === 'undefined' && setupServer(...handlers)
