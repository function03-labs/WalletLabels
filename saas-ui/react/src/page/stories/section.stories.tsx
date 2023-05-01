import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Card, CardBody, BoxProps, Text } from '@chakra-ui/react'

import { Section, SectionProps } from '..'

export default {
  title: 'Components/Layout/Section',
  decorators: [(Story: any) => <Story />],
} as Meta

const Template: Story<SectionProps> = (args) => <Section {...args} />

const Content = (props: BoxProps) => {
  return (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed nibh
      sit amet nulla ultricies vehicula. Proin consequat auctor vestibulum.
      Phasellus sit amet fringilla erat, nec placerat dui. In iaculis ex non
      lacus dictum pellentesque. Pellentesque malesuada ipsum ex, ac ultricies
      nisi ornare non. Suspendisse potenti. Vestibulum hendrerit tellus elit,
      eget suscipit odio luctus ut. Nunc aliquam urna arcu, sit amet ultrices
      nunc malesuada id. Nam semper ante lectus, id egestas dolor tempus non.
    </Text>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  title: 'Basic section',
  children: <Content />,
}

export const Description = Template.bind({})
Description.args = {
  title: 'Basic section',
  description: 'Section description',
  children: <Content />,
}

export const VariantAnnotated = Template.bind({})
VariantAnnotated.args = {
  title: 'Annotated variant',
  description: 'Annotated variant',
  variant: 'annotated',
  children: (
    <Card>
      <CardBody>
        <Content />
      </CardBody>
    </Card>
  ),
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  title: 'Section',
  isLoading: true,
}
