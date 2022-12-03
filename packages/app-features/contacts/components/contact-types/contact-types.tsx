import * as React from 'react'
import { ButtonGroup } from '@saas-ui/react'
import { Button } from '@app/features/core/components/button'
import { usePath } from '@app/features/core/hooks/use-path'
import { useParams, useNavigate } from '@saas-ui/router'
import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Portal,
  useBreakpointValue,
} from '@chakra-ui/react'

const types = {
  all: {
    value: undefined,
    label: 'All',
    href: 'contacts',
  },
  leads: {
    value: 'leads',
    label: 'Leads',
    href: 'contacts/leads',
  },
  customers: {
    value: 'customers',
    label: 'Customers',
    href: 'contacts/customers',
  },
}

type Types = keyof typeof types

const items = Object.entries(types)

export const ContactTypes = () => {
  const params = useParams()
  const navigate = useNavigate()
  const basePath = usePath()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const [value, setValue] = React.useState(params?.type?.toString())

  React.useEffect(() => {
    setValue(params?.type?.toString())
  }, [params?.type])

  const getType = (id?: string) => {
    if (!id || !types[id as Types]) {
      return types.all
    }

    return types[id as Types]
  }

  const setType = (id: string) => {
    const type = getType(id)

    navigate(basePath + '/' + type.href)
    setValue(type.value)
  }

  const type = getType(value)

  if (isMobile) {
    return (
      <Menu>
        <MenuButton as={Button} variant="outline">
          {type.label}
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuOptionGroup onChange={(value) => setType(value.toString())}>
              {items.map(([id, { label }]) => (
                <MenuItemOption value={id}>{label}</MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Portal>
      </Menu>
    )
  }

  return (
    <ButtonGroup isAttached variant="outline">
      {items.map(([id, { value, label }]) => (
        <Button
          isActive={params?.type === value}
          onClick={() => setType(id as Types)}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  )
}
