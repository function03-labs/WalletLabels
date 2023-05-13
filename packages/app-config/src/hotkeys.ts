import { HotkeysListOptions } from '@saas-ui/hotkeys'

import { platformSelect } from '@saas-ui-pro/react'

export const appHotkeys: HotkeysListOptions = {
  general: {
    title: 'General',
    hotkeys: {
      help: {
        label: 'Help & support',
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
  settings: {
    hotkeys: {
      close: {
        label: 'Close settings',
        command: 'Esc',
      },
    },
  },
}
