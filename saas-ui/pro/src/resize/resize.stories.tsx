import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Box } from '@chakra-ui/react'

import { ResizeBox, ResizeBoxProps, ResizeHandle, useResize } from '..'

export default {
  title: 'Components/Utils/ResizeBox',
  component: ResizeBox,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

const Template: StoryFn<ResizeBoxProps> = (args) => (
  <ResizeBox {...args} height="100vh" bg="blackAlpha.200" />
)

export const Basic = {
  render: Template,
  args: {
    borderRightWidth: '1px',
  },
}

export const HandlePosition = {
  render: Template,
  args: {
    borderLeftWidth: '1px',
    handlePosition: 'left',
    position: 'absolute',
    right: 0,
  },
}

export const MaxMinWidth = {
  render: Template,
  args: {
    borderRightWidth: '1px',
    minWidth: '100px',
    maxWidth: '300px',
  },
}

export const Sticky = {
  render: Template,
  args: {
    borderRightWidth: '1px',
    position: 'sticky',
    top: 0,
  },
}

export const Custom = () => {
  const { getContainerProps, getHandleProps } = useResize({
    onHandleClick: (e: any) => {
      alert('Resize handle clicked')
    },
  })

  return (
    <Box
      {...getContainerProps()}
      position="relative"
      bg="blackAlpha.200"
      borderRightWidth="1px"
      width="200px"
      height="100vh"
    >
      <ResizeHandle
        {...getHandleProps()}
        _after={{
          content: '""',
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '4px',
          width: '2px',
          bg: 'primary.500',
          transitionProperty: 'opacity',
          transitionDuration: 'normal',
          opacity: 0,
        }}
        _hover={{
          _after: {
            opacity: 1,
          },
        }}
      />
    </Box>
  )
}
