/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Stats,
  useHits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch"

import { SearchBar } from "@/components/shared/search-bar"
import { Badge } from "@/components/ui/badge"

export function SearchBox({
  params,
  searchParams,
}: {
  params: { chainSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const initialQuery = searchParams.query as string | undefined
  const [inputValue, setInputValue] = useState(initialQuery || "")

  const { refine } = useSearchBox()
  const { refresh } = useInstantSearch()

  useEffect(() => {
    if (initialQuery !== "") {
      setInputValue(initialQuery as string)
      refine(initialQuery as string)
      refresh()
    }
  }, [initialQuery, refine, refresh])

  const handleSearchLogin = (value: string) => {
    setInputValue(value)
    refine(value)
    refresh()
    router.push(`?query=${encodeURIComponent(value)}#search-box`)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        document.getElementById("search-box")?.focus()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div>
      <form
        role="search"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
        }}
      >
        <SearchBar
          inputValue={inputValue}
          handleSearchLogin={handleSearchLogin as any}
          chain={params.chainSlug}
        />
      </form>
    </div>
  )
}

type Hit = {
  label: string
}

export default function CustomHitsTags() {
  const router = useRouter()
  const { hits } = useHits() as { hits: Hit[] }

  const uniqueHits = hits.reduce((acc: Hit[], hit) => {
    if (!acc.some((item) => item.label === hit.label)) {
      acc.push(hit)
    }
    return acc
  }, [])

  return (
    <div className="flex flex-wrap gap-1">
      {uniqueHits.slice(0, 8).map((category) => (
        <Badge
          variant="outline"
          key={category.label}
          onClick={() => {
            router.push(`?query=${encodeURIComponent(category.label)}`)
          }}
          className="cursor-pointer hover:border-green-300 hover:text-foreground"
        >
          {category.label}
        </Badge>
      ))}
    </div>
  )
}

export function CustomHitsBadge({
  category,
}: {
  category: { label: string; emoji: string }
}) {
  const router = useRouter()

  return (
    <Badge
      variant="outline"
      onClick={() => {
        router.push(`?query=${encodeURIComponent(category.label)}`)
      }}
      className="cursor-pointer hover:border-green-300 hover:text-foreground"
    >
      {category.emoji + " " + category.label}
    </Badge>
  )
}

export function StatsWrapper() {
  return (
    <Stats
      className="hidden whitespace-nowrap text-sm text-muted-foreground sm:block"
      translationds={{
        stats(processingTimeMS: number) {
          let hitCountPhrase
          return `${hitCountPhrase} found in ${processingTimeMS.toLocaleString()}ms`
        },
      }}
    />
  )
}
