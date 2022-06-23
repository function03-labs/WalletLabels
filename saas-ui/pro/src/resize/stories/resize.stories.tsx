import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Box } from '@chakra-ui/react'

import { ResizeBox, ResizeBoxProps, ResizeHandle, useResize } from '..'

export default {
  title: 'Components/Utils/ResizeBox',
  decorators: [(Story: any) => <Story />],
} as Meta

const Template: Story<ResizeBoxProps> = (args) => (
  <ResizeBox {...args} height="100vh" bg="blackAlpha.200" />
)

export const Basic = Template.bind({})
Basic.args = {
  borderRightWidth: '1px',
}

export const HandlePosition = Template.bind({})
HandlePosition.args = {
  borderLeftWidth: '1px',
  handlePosition: 'left',
  position: 'absolute',
  right: 0,
}

export const MaxMinWidth = Template.bind({})
MaxMinWidth.args = {
  borderRightWidth: '1px',
  minWidth: '100px',
  maxWidth: '300px',
}

export const Custom = () => {
  const { getContainerProps, getHandleProps } = useResize()

  return (
    <Box
      {...getContainerProps()}
      bg="blackAlpha.200"
      borderRightWidth="1px"
      width="200px"
      height="100vh"
    >
      <ResizeHandle {...getHandleProps()} />
    </Box>
  )
}
