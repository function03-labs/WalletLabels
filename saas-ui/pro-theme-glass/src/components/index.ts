import { badgeStyles } from './badge'
import { buttonStyles } from './button'
import { cardStyles } from './card'
import { navItemStyles } from './nav-item'
import { navGroupStyles } from './nav-group'
import { menuStyles } from './menu'
import { toolbarStyles } from './toolbar'
import { tabsStyles } from './tabs'
import { tagStyles } from './tag'
import Form from './form'

export const components = {
  Badge: badgeStyles,
  Button: buttonStyles,
  Card: cardStyles,
  NavItem: navItemStyles,
  NavGroup: navGroupStyles,
  Menu: menuStyles,
  Toolbar: toolbarStyles,
  Tabs: tabsStyles,
  Tag: tagStyles,
  ...Form,
}
