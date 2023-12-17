import * as React from 'react'

import { usePath } from '@app/features/common/hooks/use-path'

import { SegmentedControl } from '@ui/lib'
import { useRouter, useParams } from '@app/nextjs'

const types = [
  {
    id: 'all',
    label: 'All',
    href: 'contacts',
  },
  {
    id: 'leads',
    label: 'Leads',
    href: 'contacts/leads',
  },
  {
    id: 'customers',
    label: 'Customers',
    href: 'contacts/customers',
  },
]

const segments = types.map((type) => ({ id: type.id, label: type.label }))

export const ContactTypes = () => {
  const { push } = useRouter()
  const params = useParams()

  const basePath = usePath()

  const type = params?.type?.toString() || 'all'

  const [value, setValue] = React.useState(type)

  React.useEffect(() => {
    setValue(type)
  }, [type])

  const getType = (id?: string) => {
    const type = types.find((type) => type.id === id)
    return type || types[0]
  }

  const setType = (id: string) => {
    const type = getType(id)

    push(basePath + '/' + type.href)
    setValue(type.id)
  }

  return (
    <SegmentedControl
      segments={segments}
      value={value}
      onChange={setType}
      size="xs"
    />
  )
}
