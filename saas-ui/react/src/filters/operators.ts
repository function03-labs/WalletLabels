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

export type FilterOperator = {
  id: FilterOperatorId
  label: string
  types: FilterType[]
  comparator(value: unknown, filterValue: unknown): boolean | undefined
}
export type FilterOperators = FilterOperator[]

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

      return (
        !!filterValue &&
        value?.toLowerCase().includes(filterValue.toLowerCase())
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
      filterValue: Date | number,
    ) {
      if (typeof value === 'string') {
        value = parseISO(value)
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
      filterValue: Date | number,
    ) {
      if (typeof value === 'string') {
        value = parseISO(value)
      }
      return !!value && isAfter(value, filterValue)
    },
  },
]
