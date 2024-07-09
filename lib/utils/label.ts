/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { ColumnFiltersState } from "@tanstack/react-table"
import { z } from "zod"

import { AddressLabelType, FilterLabelType } from "@/types/label"

export function extractLabelData(data: any[]): AddressLabelType[] {
  return data.map((item: { [x: string]: any }) => {
    return {
      address: item[""],
      blockchain: item["Wallet Labels | Address Label Template"],
      addressName: item["_1"],
      labelType: item["_2"],
      labelSubType: item["_3"],
      label: item["_4"],
    }
  })
}
export function getFilterFields(filter: FilterLabelType) {
  const removeDuplicatesAndSlice = (arr: string[], limit: number) => {
    return Array.from(new Set(arr))
      .slice(0, limit)
      .map((item) => ({
        label: item,
        value: item.toLowerCase(),
      }))
  }

  const fields = [
    {
      label: "Label Type",
      value: "labelType",
      options: removeDuplicatesAndSlice(filter.labelTypes, 5),
    },
    {
      label: "Label Sub-Type",
      value: "labelSubType",
      options: removeDuplicatesAndSlice(filter.labelSubTypes, 5),
    },
    {
      label: "Address Name",
      value: "addressName",
      options: removeDuplicatesAndSlice(filter.addressNames, 5),
    },
    {
      label: "Label",
      value: "label",
      options: removeDuplicatesAndSlice(filter.labelNames, 5),
    },
  ]

  return fields.filter((field) => {
    const filterArray = filter[`${field.value}s` as keyof FilterLabelType]
    return Array.isArray(filterArray) && filterArray.length > 0
  })
}

export function deserialize<T extends z.AnyZodObject>(schema: T) {
  const castToSchema = z.preprocess((val) => {
    if (typeof val !== "string") return val
    return val
      .trim()
      .split(" ")
      .reduce((prev, curr) => {
        const [name, value] = curr.split(":")
        if (!value || !name) return prev

        if (!value.includes(",")) {
          prev[name] = [value]
          return prev
        }
        const values = value.split(",")
        prev[name] = values
        return prev
      }, {} as Record<string, unknown>)
  }, schema)
  return (value: string) => castToSchema.safeParse(value)
}

export function serializeColumFilters(columnFilters: ColumnFiltersState) {
  return columnFilters.reduce((prev, curr) => {
    if (Array.isArray(curr.value)) {
      return `${prev}${curr.id}:${curr.value.join(",")} `
    }
    return `${prev}${curr.id}:${curr.value as string} `
  }, "")
}
