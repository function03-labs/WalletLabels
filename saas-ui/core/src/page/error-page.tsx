import * as React from 'react'

import { EmptyState, EmptyStateProps } from '@saas-ui/react'

export const ErrorPage: React.FC<EmptyStateProps> = (props) => {
  /* @ts-ignore: @todo this will get fixed in @saas-ui/layout */
  return <EmptyState flex="1" {...props} />
}
