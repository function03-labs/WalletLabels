import * as React from 'react'

import { EmptyState, EmptyStateProps } from '@saas-ui/react'

export type ErrorPageProps = EmptyStateProps

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  return <EmptyState flex="1" {...props} />
}
