'use client'

import React from 'react'
import NextLink, { LinkProps } from 'next/link'

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <NextLink ref={ref} {...props} />,
)
