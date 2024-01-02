import { badgeStyles } from './badge'
import { buttonStyles } from './button'
import { cardStyles } from './card'
import { navItemStyles } from './nav-item'
import { navGroupStyles } from './nav-group'
import { menuStyles } from './menu'
import { toolbarStyles } from './toolbar'
import { tabsStyles } from './tabs'
import { tagStyles } from './tag'
import { tooltipStyles } from './tooltip'
import { structuredListStyles } from './structured-list'
import { selectStyles } from './select'
import Form from './form'

export const components = {
  Badge: badgeStyles,
  Button: buttonStyles,
  Card: cardStyles,
  Menu: menuStyles,
  Tabs: tabsStyles,
  Tag: tagStyles,
  Tooltip: tooltipStyles,
  SuiToolbar: toolbarStyles,
  SuiNavItem: navItemStyles,
  SuiNavGroup: navGroupStyles,
  SuiStructuredList: structuredListStyles,
  SuiSelect: selectStyles,
  ...Form,
}
