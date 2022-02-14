import * as React from 'react'
import { Icon, IconProps } from '@chakra-ui/icon'

export const ChevronDown: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <polyline
      points="6 9 12 15 18 9"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></polyline>
  </Icon>
)

export const ChevronRight: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <polyline
      points="9 18 15 12 9 6"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></polyline>
  </Icon>
)
