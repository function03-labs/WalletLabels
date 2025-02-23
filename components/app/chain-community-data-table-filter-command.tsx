"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type { Table } from "@tanstack/react-table"
import { Search } from "lucide-react"
import type { z } from "zod"

import { useUpdateSearchParams } from "@/lib/hooks/use-update-search-params"
import { cn } from "@/lib/utils"
import { deserialize, serializeColumFilters } from "@/lib/utils/label"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"

import type { DataTableFilterField } from "@/types/label"

interface DataTableFilterCommandProps<TData, TSchema extends z.AnyZodObject> {
  table: Table<TData>
  schema: TSchema
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTableFilterCommand<TData, TSchema extends z.AnyZodObject>({
  schema,
  table,
  filterFields,
}: DataTableFilterCommandProps<TData, TSchema>) {
  const columnFilters = table.getState().columnFilters
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [currentWord, setCurrentWord] = useState("")
  const [inputValue, setInputValue] = useState<string>(
    serializeColumFilters(columnFilters)
  )
  const updateSearchParams = useUpdateSearchParams()
  const router = useRouter()

  const updatePageSearchParams = (values: Record<string, unknown>) => {
    const newSearchParams = updateSearchParams(values, { override: true })
    router.replace(`?${newSearchParams}`, { scroll: false })
  }

  useEffect(() => {
    if (currentWord !== "" && open) return
    const searchparams = deserialize(schema)(inputValue)
    if (searchparams.success) {
      table.resetColumnFilters()

      for (const key of Object.keys(searchparams.data)) {
        table
          .getColumn(key)
          ?.setFilterValue(
            searchparams.data[key as keyof typeof searchparams.data]
          )
      }

      updatePageSearchParams(searchparams.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, open, currentWord])

  useEffect(() => {
    setInputValue(serializeColumFilters(columnFilters))
  }, [columnFilters])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (open) {
      inputRef?.current?.focus()
    }
  }, [open])

  return (
    <div data-oid="8un68b.">
      <div
        className={cn(
          "group flex w-full items-center rounded-lg border border-primary/40 bg-background px-3 text-muted-foreground ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:bg-accent hover:text-accent-foreground",
          open ? "hidden" : "visible"
        )}
        data-oid="5peq_s_"
      >
        <Search
          className="mr-2 size-4 shrink-0 text-muted-foreground opacity-50"
          data-oid="pgnjyxz"
        />

        <button
          type="button"
          className="h-11 w-full max-w-sm truncate py-3 text-left text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 md:max-w-xl lg:max-w-4xl xl:max-w-5xl"
          onClick={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
          data-oid="8fyu_.z"
        >
          {inputValue.trim() ? (
            <span className="text-foreground" data-oid="4baafbj">
              {inputValue}
            </span>
          ) : (
            <span data-oid="pbileku">Search data table...</span>
          )}
        </button>
        {/* add group-hover? */}
        <Kbd
          className="ml-auto text-muted-foreground group-hover:text-accent-foreground"
          data-oid="7ry1ij."
        >
          <span className="mr-0.5" data-oid="hu1w.u1">
            ⌘
          </span>
          <span data-oid="__millm">K</span>
        </Kbd>
      </div>
      <Command
        className={cn(
          "overflow-visible rounded-lg border shadow-md [&>div]:border-none",
          open ? "visible" : "hidden"
        )}
        filter={(value, _search) => {
          if (value.includes(currentWord.toLowerCase())) return 1
          /**
           * @example [filter, query] = ["regions", "ams,gru"]
           */
          const [filter, query] = currentWord.toLowerCase().split(":")
          if (query) {
            /**
             * @example queries = ["ams", "gru"]
             */
            const queries = query.split(",")
            const extendedQueries = queries?.map((item) => `${filter}:${item}`)
            if (extendedQueries.some((item) => item === value)) return 0
            if (extendedQueries.some((item) => value.includes(item))) return 1
          }
          return 0
        }}
        data-oid="agja6x7"
      >
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onKeyDown={(e) => {
            if (e.key === "Escape") inputRef?.current?.blur()
          }}
          onBlur={() => setOpen(false)}
          // onFocus={() => setOpen(true)}
          onInput={(e) => {
            const caretPositionStart = e.currentTarget?.selectionStart || -1
            const currentValue = e.currentTarget?.value || ""

            let start = caretPositionStart
            let end = caretPositionStart

            while (start > 0 && currentValue[start - 1] !== " ") start--
            while (end < currentValue.length && currentValue[end] !== " ") end++

            const word = currentValue.substring(start, end)
            setCurrentWord(word)
          }}
          placeholder="Search data table..."
          className="text-foreground"
          data-oid=".z48:rl"
        />

        <div className="relative" data-oid="w1jnib3">
          <div
            className="absolute top-2 z-10 w-full overflow-hidden rounded-lg border border-accent-foreground/30 bg-popover text-popover-foreground shadow-md outline-none animate-in"
            data-oid="_5fg-bi"
          >
            <CommandList data-oid="6bn7:4y">
              <CommandGroup heading="Filter" data-oid="57w:lw1">
                {filterFields?.map(({ value, options }) => {
                  if (typeof value !== "string") return null
                  if (inputValue.includes(`${value}:`)) return null
                  return (
                    <CommandItem
                      key={value}
                      value={value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={(value) => {
                        setInputValue((prev) => {
                          if (currentWord.trim() === "") {
                            const input = `${prev}${value}`
                            return `${input}:`
                          }
                          // lots of cheat
                          const isStarting = currentWord === prev
                          const prefix = isStarting ? "" : " "
                          const input = prev.replace(
                            `${prefix}${currentWord}`,
                            `${prefix}${value}`
                          )
                          return `${input}:`
                        })
                        setCurrentWord(`${value}:`)
                      }}
                      className="group"
                      data-oid="4ydchhi"
                    >
                      {value}
                      <span
                        className="ml-1 hidden truncate text-muted-foreground/80 group-aria-[selected=true]:block"
                        data-oid="9194u2k"
                      >
                        {options?.map(({ value }) => `[${value}]`).join(" ")}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              <CommandSeparator data-oid="nipafgn" />
              <CommandGroup heading="Query" data-oid="a5y-0-c">
                {filterFields?.map(({ value, options }) => {
                  if (typeof value !== "string") return null
                  if (!currentWord.includes(`${value}:`)) return null
                  const column = table.getColumn(value)
                  const facetedValue = column?.getFacetedUniqueValues()

                  return options?.map(({ value: optionValue }) => {
                    return (
                      <CommandItem
                        key={`${value}:${optionValue}`}
                        value={`${value}:${optionValue}`}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onSelect={(value) => {
                          setInputValue((prev) => {
                            if (currentWord.includes(" ")) {
                              const words = currentWord.split(" ")
                              words[words.length - 1] = `${optionValue}`
                              const input = prev.replace(
                                currentWord,
                                words.join("-")
                              )
                              return `${input.trim()} `
                            }
                            const input = prev.replace(currentWord, value)
                            return `${input.trim()} `
                          })
                          setCurrentWord("")
                        }}
                        data-oid="8i4al62"
                      >
                        {`${optionValue}`}
                        <span
                          className="ml-auto font-mono text-muted-foreground"
                          data-oid="rvl2r0f"
                        >
                          {facetedValue?.get(optionValue)}
                        </span>
                      </CommandItem>
                    )
                  })
                })}
              </CommandGroup>
              <CommandEmpty data-oid="1cjsw25">
                <span className="text-muted-foreground" data-oid="yn79zr:">
                  No results found
                </span>
              </CommandEmpty>
            </CommandList>
            <div
              className="flex flex-wrap gap-3 border-t bg-accent/50 px-2 py-1.5 text-sm text-accent-foreground"
              cmdk-footer=""
              data-oid="9n:t7_d"
            >
              <span data-oid=".s-u8m3">
                Use{" "}
                <Kbd className="bg-background" data-oid="bwli-5g">
                  ↑
                </Kbd>{" "}
                <Kbd className="bg-background" data-oid="i7_o38u">
                  ↓
                </Kbd>{" "}
                to navigate
              </span>
              <span data-oid="t1m_8s1">
                <Kbd className="bg-background" data-oid="drjynsp">
                  Enter
                </Kbd>{" "}
                to query
              </span>
              <span data-oid="d6wpk8l">
                <Kbd className="bg-background" data-oid="cj6x8j.">
                  Esc
                </Kbd>{" "}
                to close
              </span>
            </div>
          </div>
        </div>
      </Command>
    </div>
  )
}
