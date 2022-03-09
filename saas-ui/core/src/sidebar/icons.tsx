import * as React from 'react'
import { createIcon } from '@chakra-ui/icon'

export const ChevronDownIcon = createIcon({
  displayName: 'ChevronDownIcon',
  viewBox: '0 0 24 24',
  path: (
    <polyline
      points="6 9 12 15 18 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></polyline>
  ),
})

export const ChevronRightIcon = createIcon({
  displayName: 'ChevronDownIcon',
  viewBox: '0 0 24 24',
  path: (
    <polyline
      points="9 18 15 12 9 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></polyline>
  ),
})

export const HamburgerIcon = createIcon({
  displayName: 'ChevronDownIcon',
  viewBox: '0 0 24 24',
  path: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </g>
  ),
})
