import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { ListPage, ListPageProps } from './list-page'

export default {
  title: 'Modules/Core/ListPage',
} as Meta

interface Data {
  id: string
  name: string
}

const Template: Story<ListPageProps<Data>> = (args) => <ListPage {...args} />

export const Basic = Template.bind({})
Basic.args = {
  title: 'Basic List Page',
  data: [],
}
