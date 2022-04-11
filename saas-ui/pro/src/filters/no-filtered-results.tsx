import { useFiltersContext } from '..'

import { NoResults, NoResultsProps } from '../data-grid/no-results'

export interface NoFilteredResultsProps extends NoResultsProps {
  title?: string
  clearLabel?: string
  onReset?(): void
}

export const NoFilteredResults: React.FC<NoFilteredResultsProps> = (props) => {
  const { reset, activeFilters } = useFiltersContext()

  const count = activeFilters?.length || 'your'

  const {
    title = `No results matching ${count} filters`,
    clearLabel = 'Clear filters',
    onReset: onResetProp,
    ...rest
  } = props

  const onReset = () => {
    reset()
    onResetProp?.()
  }

  return (
    <NoResults
      title={title}
      clearLabel={clearLabel}
      onReset={onReset}
      {...rest}
    />
  )
}
