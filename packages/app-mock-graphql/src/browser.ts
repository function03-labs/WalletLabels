import { setupWorker } from 'msw'

import { handlers } from './handlers'

const init = () => {
  try {
    if (typeof window !== 'undefined') {
      return setupWorker(...handlers)
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const worker = init()
