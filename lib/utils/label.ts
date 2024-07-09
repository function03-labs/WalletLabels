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

export function getFilterFields(filter: FilterLabelType[]) {
  return [
    {
      label: "Label Type",
      value: "labelType",
      options: filter.slice(0, 5).map((item) => ({
        label: item.toString(),
        value: item.toString().toLowerCase(),
      })),
    },
    {
      label: "Label Sub-Type",
      value: "labelSubType",
      options: filter.slice(0, 5).map((item) => ({
        label: item.toString(),
        value: item.toString().toLowerCase(),
      })),
    },
    {
      label: "Address Name",
      value: "addressName",
      options: filter.slice(0, 5).map((item) => ({
        label: item.toString(),
        value: item.toString().toLowerCase(),
      })),
    },
    {
      label: "Label",
      value: "label",
      options: filter.slice(0, 5).map((item) => ({
        label: item.toString(),
        value: item.toString().toLowerCase(),
      })),
    },
  ].filter((field) =>
    filter.some(
      (item) =>
        item[field.value as keyof FilterLabelType].toString().toLowerCase() ===
        field.value
    )
  )
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
