import * as React from 'react'
import { createIcon } from '../utils/create-icon'

export const ChevronDownIcon = createIcon({
  displayName: 'ChevronDownIcon',
  path: <polyline points="6 9 12 15 18 9"></polyline>,
})

export const ChevronRightIcon = createIcon({
  displayName: 'ChevronRightIcon',
  path: <polyline points="9 18 15 12 9 6"></polyline>,
})

export const HamburgerIcon = createIcon({
  displayName: 'ChevronDownIcon',
  path: (
    <g fill="none">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </g>
  ),
})
