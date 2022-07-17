import { Row, FilterFn } from '@tanstack/react-table'
import { FilterValue } from './use-active-filter'
import {
  defaultOperators,
  FilterOperator,
  FilterOperatorId,
  FilterType,
} from './operators'

function testFalsey(val: any) {
  return val === undefined || val === null || val === ''
}

export const useDataGridFilter = <D extends object>(
  type: FilterType = 'string',
  operators = defaultOperators,
) => {
  const typeOperators = operators.reduce(
    (memo: Record<FilterOperatorId, FilterOperator>, operator) => {
      if (operator.types.includes(type)) {
        memo[operator.id] = operator
      }

      return memo
    },
    {},
  )

  const dataGridFilter: FilterFn<D> = (
    row: Row<D>,
    columnId: string,
    filterValue: { value: FilterValue; operator: FilterOperatorId },
  ) => {
    const { value, operator } = filterValue

    // return rows.filter((row) => {
    // return columnIds.some((id) => {
    const rowValue = row.getValue(columnId)
    return !!typeOperators[operator]?.comparator(rowValue, value)
    // })
    // })
  }
  dataGridFilter.autoRemove = (val: any) => testFalsey(val)
  return dataGridFilter
}
