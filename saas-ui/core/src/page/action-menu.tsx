import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Button,
} from '@chakra-ui/react'

import Template, { TemplateConfig, TemplateComponents } from '../Template'

export type ActionMenuProps = {
  label: string
  items: Array<TemplateConfig>
}

export interface ActionMenuItemProps {
  label: string
}

function ActionMenuItem({ label, ...props }: ActionMenuItemProps) {
  return <MenuItem {...props}>{label}</MenuItem>
}

const defaultComponents: TemplateComponents = {
  group: MenuGroup,
  item: ActionMenuItem,
  divider: MenuDivider,
}

export default function ActionMenu({ label, items }: ActionMenuProps) {
  return (
    <Menu>
      <MenuButton as={Button} size="sm">
        {label}
      </MenuButton>
      <MenuList>
        <Template
          defaultType={'item'}
          config={items}
          components={defaultComponents}
        />
      </MenuList>
    </Menu>
  )
}
