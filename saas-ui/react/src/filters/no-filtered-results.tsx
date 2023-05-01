import * as React from 'react'
import { useFiltersContext } from '..'

import { NoResults, NoResultsProps } from '../data-grid/no-results'

export interface NoFilteredResultsProps extends NoResultsProps {
  title?: string
  clearLabel?: string
  onReset?(): void
}

export const NoFilteredResults: React.FC<NoFilteredResultsProps> = (props) => {
  const { reset } = useFiltersContext()
  const { onReset: onResetProp, ...rest } = props

  const onReset = () => {
    reset()
    onResetProp?.()
  }

  return <NoResults onReset={onReset} {...rest} />
}
