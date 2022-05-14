import { setupWorker } from 'msw'

import { handlers } from './handlers'

export const worker = typeof window !== 'undefined' && setupWorker(...handlers)
