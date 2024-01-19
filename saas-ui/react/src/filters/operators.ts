import { isAfter, isBefore, parseISO } from 'date-fns'

export type FilterOperatorId =
  | 'is'
  | 'isNot'
  | 'before'
  | 'after'
  | 'contains'
  | 'containsNot'
  | 'lessThan'
  | 'moreThan'
  | 'between'

export type FilterOperator<
  Operator extends string = FilterOperatorId,
  Type extends string = FilterType,
> = {
  id: Operator
  label: string
  types: Type[]
  comparator(value: unknown, filterValue: unknown): boolean
}
export type FilterOperators<
  Operator extends string = FilterOperatorId,
  Type extends string = FilterType,
> = FilterOperator<Operator, Type>[]

export type FilterType =
  | 'enum'
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'datetime'

export const defaultOperators: FilterOperators = [
  {
    id: 'is',
    label: 'is',
    types: ['enum', 'string', 'number', 'boolean', 'date'],
    comparator(value: any, filterValue: any) {
      return value === filterValue
    },
  },
  {
    id: 'isNot',
    label: 'is not',
    types: ['enum', 'string', 'number', 'boolean', 'date'],
    comparator(value: any, filterValue: any) {
      return value !== filterValue
    },
  },
  {
    id: 'contains',
    label: 'contains',
    types: ['string'],
    comparator(
      value: string | string[] | undefined,
      filterValue: string | undefined,
    ) {
      if (Array.isArray(value)) {
        return value.some((v) => v.toLowerCase() === filterValue?.toLowerCase())
      }

      return !!(
        filterValue && value?.toLowerCase().includes(filterValue.toLowerCase())
      )
    },
  },
  {
    id: 'containsNot',
    label: 'does not contain',
    types: ['string'],
    comparator(
      value: string | string[] | undefined,
      filterValue: string | undefined,
    ) {
      if (Array.isArray(value)) {
        return !value.some(
          (v) => v.toLowerCase() === filterValue?.toLowerCase(),
        )
      }
      return (
        value !== undefined &&
        !!filterValue &&
        !value?.toLowerCase().includes(filterValue.toLowerCase())
      )
    },
  },
  {
    id: 'lessThan',
    label: 'less than',
    types: ['number'],
    comparator(value: number | undefined, filterValue: number) {
      return value !== undefined && value < filterValue
    },
  },
  {
    id: 'moreThan',
    label: 'more than',
    types: ['number'],
    comparator(value: number | undefined, filterValue: number) {
      return value !== undefined && value > filterValue
    },
  },
  {
    id: 'before',
    label: 'before',
    types: ['date', 'datetime'],
    comparator(
      value: Date | string | number | undefined,
      filterValue: Date | string | number,
    ) {
      if (typeof value === 'string') {
        value = parseISO(value)
      }
      if (typeof filterValue === 'string') {
        filterValue = parseISO(filterValue)
      }
      return !!value && isBefore(value, filterValue)
    },
  },
  {
    id: 'after',
    label: 'after',
    types: ['date', 'datetime'],
    comparator(
      value: Date | string | number | undefined,
      filterValue: Date | string | number,
    ) {
      if (typeof value === 'string') {
        value = parseISO(value)
      }
      if (typeof filterValue === 'string') {
        filterValue = parseISO(filterValue)
      }
      return !!value && isAfter(value, filterValue)
    },
  },
]

export const createOperators = <Operator extends string, Type extends string>(
  operators: FilterOperators<Operator, Type>,
) => {
  return operators
}
