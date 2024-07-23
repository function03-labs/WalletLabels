export type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export interface ISearchProps {
  handleSearchLogin: (ETHquery?: string) => void
  inputRef?: React.RefObject<HTMLInputElement>
  togglePalette?: Function
  inputValue?: string
  chain?: string
}

export type PipelineStage =
  | {
      $search: {
        index: string
        text: {
          query: string
          fuzzy: {}
          path: {
            wildcard: string
          }
        }
      }
    }
  | {
      $skip: number
    }
  | {
      $limit: number
    }

export interface DataTableFilterOption<TData> {
  id: string
  label: string
  value: keyof TData
  options: OptionTable[]
  filterValues?: string[]
  filterOperator?: string
  isMulti?: boolean
}

export interface OptionTable {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  withCount?: boolean
}

export interface DataTableFilterField<TData> {
  label: string
  value: keyof TData
  placeholder?: string
  options?: OptionTable[]
}
