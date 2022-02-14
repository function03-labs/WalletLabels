import { HotkeysProvider, HotkeysListOptions } from '@saas-ui/hotkeys'

import { appHotkeys } from '@app/config/hotkeys'

interface HotkeysProps {
  hotkeys?: HotkeysListOptions
}

export const Hotkeys: React.FC<HotkeysProps> = ({ children, hotkeys }) => {
  return (
    <HotkeysProvider hotkeys={hotkeys || appHotkeys}>
      {children}
    </HotkeysProvider>
  )
}
