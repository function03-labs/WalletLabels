import type * as React from "react"

export interface QueryParameters {
  address: string
  limit: number
}

export interface Label {
  address: string
  address_name: string
  label_type: string
  label_subtype: string
  label: string
}

export interface Activity {
  count: number
  isRefined: boolean
  value: string
  label: string
  highlighted?: string
}

export type AddressLabelType = {
  blockchain: string
  address: string
  addressName: string
  labelType: string
  labelSubType: string
  label: string
}

export type FilterLabelType = {
  labelTypes: string[]
  labelSubTypes: string[]
  addressNames: string[]
  labelNames: string[]
}

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Option {
  label: string
  value: string
}

export interface DataTableFilterField<TData> {
  label: string
  value: string
  component?: (props: Option) => JSX.Element | null
  options?: Option[]
}

export interface DataTableFilterOption<TData> {
  id: string
  label: string
  value: keyof TData
  options: Option[]
  filterValues?: string[]
  filterOperator?: string
  isMulti?: boolean
}
