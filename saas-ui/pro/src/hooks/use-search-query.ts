import * as React from 'react'

const regExpSyntaxCharacter = /[.*+?^${}()|[\]\\]/g

function escapeRegExp(value: string) {
  return value.replace(regExpSyntaxCharacter, '\\$&')
}

interface Result {
  id?: string
  [key: string]: any
}

export interface UseSearchQueryOptions<T> {
  items?: Array<T>
  fields?: string[]
  defaultValue?: string
}

export const useSearchQuery = <T extends Result = Result>(
  props: UseSearchQueryOptions<T> = {},
) => {
  const { items, fields = ['id'], defaultValue = '' } = props

  const [query, setQuery] = React.useState(defaultValue)

  const results = React.useMemo(() => {
    if (!query || !query.length) {
      return items
    }

    const re = query && new RegExp(escapeRegExp(query), 'i')

    return items?.filter((item) =>
      fields.find((field) => item[field].match(re)),
    )
  }, [query, items])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setQuery(target.value)
  }

  const onReset = () => setQuery('')

  return { value: query, results, onReset, onChange }
}
