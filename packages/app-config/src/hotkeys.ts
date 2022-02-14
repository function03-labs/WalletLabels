import { HotkeysListOptions } from '@saas-ui/react'

import { platformSelect } from '@saas-ui/utils'

export const appHotkeys: HotkeysListOptions = {
  general: {
    title: 'General',
    hotkeys: {
      showHotkeys: {
        label: 'Show this window',
        command: '?',
      },
      logout: {
        label: 'Log out',
        command: platformSelect({ mac: '⌥ ⇧ Q' }, 'Ctrl+Shift+Q'),
      },
    },
  },
  contacts: {
    title: 'Contacts',
    hotkeys: {
      createApp: {
        label: 'Create new contact',
        command: '⌥ N',
      },
    },
  },
}

export const settingsHotkeys: HotkeysListOptions = {
  settings: {
    hotkeys: {
      close: {
        label: 'Close settings',
        command: 'Esc',
      },
    },
  },
}

export const fullscreenHotkeys: HotkeysListOptions = {
  settings: {
    hotkeys: {
      close: {
        label: 'Close settings',
        command: 'Esc',
      },
    },
  },
}
