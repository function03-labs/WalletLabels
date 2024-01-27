'use client'

import * as React from 'react'
import { Button } from '@chakra-ui/react'
import {
  EmptyStateContainer,
  EmptyStateContainerProps,
  EmptyStateActions,
  EmptyStateDescription,
} from '@saas-ui/react'
import { useDataGridContext } from './data-grid'

export interface NoResultsProps
  extends Omit<EmptyStateContainerProps, 'title'> {
  title?: string
  resource?: string
  clearLabel?: string
  onReset?(): void
}

export const NoResults: React.FC<NoResultsProps> = (props) => {
  const { state } = useDataGridContext()

  const count = state.columnFilters.length

  const {
    resource = 'results',
    title = state.globalFilter
      ? `No ${resource} found for "${state.globalFilter}"`
      : count
        ? `No ${resource} matching ${count} filters.`
        : `No ${resource}.`,
    clearLabel = 'Clear filters',
    onReset,
    ...rest
  } = props

  return (
    <EmptyStateContainer variant="no-results" {...rest}>
      <EmptyStateDescription>{title}</EmptyStateDescription>
      {!!state.columnFilters.length && (
        <EmptyStateActions>
          <Button onClick={onReset} variant="ghost" size="xs">
            {clearLabel}
          </Button>
        </EmptyStateActions>
      )}
    </EmptyStateContainer>
  )
}
