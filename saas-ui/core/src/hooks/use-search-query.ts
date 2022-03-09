import * as React from 'react'

const regExpSyntaxCharacter = /[.*+?^${}()|[\]\\]/g

function escapeRegExp(value: string) {
  return value.replace(regExpSyntaxCharacter, '\\$&')
}

type Result = Record<string, any>

export interface UseSearchQueryOptions<T> {
  items: Array<T>
  fields?: string[]
}

export const useSearchQuery = <T = Result>(props: UseSearchQueryOptions<T>) => {
  const { items, fields = ['id'] } = props

  const [query, setQuery] = React.useState('')

  const results = React.useMemo(() => {
    if (!query || !query.length) {
      return items
    }

    const re = query && new RegExp(escapeRegExp(query), 'i')

    return items.filter((item) => fields.find((field) => item[field].match(re)))
  }, [query])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setQuery(target.value)
  }

  const onReset = () => setQuery('')

  return { value: query, results, onReset, onChange }
}
