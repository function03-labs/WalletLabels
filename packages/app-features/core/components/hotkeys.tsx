import { HotkeysProvider, HotkeysListOptions } from '@saas-ui/react'

import { appHotkeys } from '@app/config'

interface HotkeysProps {
  hotkeys?: HotkeysListOptions
  children: React.ReactNode
}

export const Hotkeys: React.FC<HotkeysProps> = ({ children, hotkeys }) => {
  return (
    <HotkeysProvider hotkeys={hotkeys || appHotkeys}>
      {children}
    </HotkeysProvider>
  )
}
