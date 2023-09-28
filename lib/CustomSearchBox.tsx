import { useEffect, useRef, useState } from "react"
import {
  UseSearchBoxProps,
  useHits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch"

import { Badge } from "@/components/ui/badge"
import { Grid } from "../pages"
import SearchComponent from "../pages/searchBar"

export function CustomSearchBox({
  initialQuery = "",
  setinitialSearch,
  ...props
}: any) {
  const { query, refine } = useSearchBox(props)
  const [inputValue, setInputValue] = useState(initialQuery || query)
  const { status, refresh } = useInstantSearch()
  useEffect(() => {
    if (initialQuery !== "") {
      setInputValue(initialQuery)
      // setinitialSearch(true)
      refine(initialQuery)
      refresh()
    }
  }, [initialQuery])

  useEffect(() => {
    if (inputValue !== "") {
      setinitialSearch(true)
    }
    if (inputValue == "") {
      setinitialSearch(false)
    }
  }, [inputValue == ""])
  const inputRef = useRef<HTMLInputElement>(null)

  const isSearchStalled = status === "stalled"

  function setQuery(newQuery: string) {
    setInputValue(newQuery)

    refine(newQuery)
  }

  return (
    <div>
      <form
        action=""
        role="search"
        noValidate
        onSubmit={event => {
          event.preventDefault()
          event.stopPropagation()

          if (inputRef.current) {
            inputRef.current.blur()
          }
        }}>
        <SearchComponent
          handleSearchLogin={setQuery}
          disabled={false}
          inputRef={inputRef}
          inputValue={inputValue}
        />
        {/* <input
              ref={inputRef}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              placeholder="Search for products"
              spellCheck={false}
              maxLength={512}
              type="search"
              value={inputValue}
              onChange={event => {
                setQuery(event.currentTarget.value)
              }}
              autoFocus
            />
            <button type="submit">Submit</button>
    
            </button> */}
        {/* <span hidden={!isSearchStalled}>Searching…</span> */}
      </form>
    </div>
  )
}
export function CustomHits() {
  // Use the useHits() hook to get the hits
  const { hits } = useHits()

  // Transform hits into the shape required by your Grid component
  const gridData = hits.map(hit => ({
    address: hit.address,
    address_name: hit.address_name,
    label_type: hit.label_type,
    label_subtype: hit.label_subtype,
    label: hit.label,
    tag: hit.tag,
  }))

  return <Grid data={gridData} />
}
export default function CustomHitsTags({
  setSearchInput,
}: {
  setSearchInput: (value: string) => void
}) {
  // Use the useHits() hook to get the hits
  const { hits } = useHits()

  // Remove duplicates based on 'address'
  const uniqueHits = hits.reduce((acc, hit) => {
    if (!acc.some(item => item.label === hit.label)) {
      acc.push(hit)
    }
    return acc
  }, [])

  return (
    <div>
      {uniqueHits
        //limit to top 8
        .slice(0, 8)
        .map(category => (
          <Badge
            key={category.label}
            onClick={() => {
              setSearchInput(category.label)
            }}
            // ignore ts error
            // @ts-ignore
            variant="none"
            className="hover:border-green-300 hover:text-foreground ">
            {category.label}
          </Badge>
        ))}
    </div>
  )
}
