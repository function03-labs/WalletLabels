import * as React from 'react'
import { createIcon } from '../utils/create-icon'

export const ArrowLeftIcon = createIcon({
  displayName: 'ArrowLeftIcon',
  path: (
    <>
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </>
  ),
})
