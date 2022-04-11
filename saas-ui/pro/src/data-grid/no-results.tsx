import {
  Button,
  EmptyStateContainer,
  EmptyStateContainerProps,
  EmptyStateActions,
  EmptyStateDescription,
} from '@saas-ui/react'

export interface NoResultsProps
  extends Omit<EmptyStateContainerProps, 'title'> {
  title?: string
  clearLabel?: string
  onReset?(): void
}

export const NoResults: React.FC<NoResultsProps> = (props) => {
  const {
    title = 'No results matching your filters',
    clearLabel = 'Clear filters',
    onReset,
    ...rest
  } = props

  return (
    <EmptyStateContainer variant="no-results" {...rest}>
      <EmptyStateDescription>{title}</EmptyStateDescription>
      <EmptyStateActions>
        <Button
          onClick={onReset}
          label={clearLabel}
          variant="ghost"
          size="xs"
        />
      </EmptyStateActions>
    </EmptyStateContainer>
  )
}
