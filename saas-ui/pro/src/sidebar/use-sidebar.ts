import { UseCollapseReturn } from '@saas-ui/collapse'

import { createContext } from '@chakra-ui/react-utils'

export interface UseSidebarReturn extends UseCollapseReturn {
  isMobile?: boolean
  variant?: string
  size?: string
}

export const [SidebarProvider, useSidebarContext] =
  createContext<UseSidebarReturn>({
    name: 'SidebarContext',
    errorMessage:
      'SidebarContext not available, SidebarLink needs to be a child of Sidebar.',
  })
