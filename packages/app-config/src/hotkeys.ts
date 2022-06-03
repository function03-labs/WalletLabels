import { HotkeysListOptions } from '@saas-ui/react'

import { platformSelect } from '@saas-ui/pro'

export const appHotkeys: HotkeysListOptions = {
  general: {
    title: 'General',
    hotkeys: {
      showHotkeys: {
        label: 'Show this window',
        command: '?',
      },
      search: {
        label: 'Search',
        command: '/',
      },
      filter: {
        label: 'Add filter',
        command: 'F',
      },
      logout: {
        label: 'Log out',
        command: platformSelect({ mac: '⌥ ⇧ Q' }, 'Ctrl+Shift+Q'),
      },
    },
  },
  navigation: {
    title: 'Navigation',
    hotkeys: {
      dashboard: {
        label: 'Go to Dashboard',
        command: 'G then D',
      },
      inbox: {
        label: 'Go to Inbox',
        command: 'G then I',
      },
      contacts: {
        label: 'Go to Contacts',
        command: 'G then C',
      },
    },
  },
  contacts: {
    title: 'Contacts',
    hotkeys: {
      add: {
        label: 'Add a person',
        command: 'A',
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
