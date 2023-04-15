import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { ListPage, ListPageProps } from './list-page'

export default {
  title: 'Components/ListPage',
  component: ListPage,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

interface Data {
  id: string
  name: string
}

export const Default = {
  args: {
    title: 'List Page',
    data: [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
      { id: '4', name: 'Item 4' },
      { id: '5', name: 'Item 5' },
    ],
    columns: [
      {
        id: 'name',
        header: 'Name',
      },
    ],
  },
}
