import { HotkeysProvider, HotkeysListOptions } from '@saas-ui/hotkeys'

import { appHotkeys } from '@app/config/hotkeys'

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
