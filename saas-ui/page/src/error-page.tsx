import * as React from 'react'

import { EmptyState, EmptyStateProps } from '@saas-ui/react'

export const ErrorPage: React.FC<EmptyStateProps> = (props) => {
  return <EmptyState flex="1" {...props} />
}
