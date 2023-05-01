import * as React from 'react'

import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Portal,
  Tab,
  TabList,
  Tabs,
  useBreakpointValue,
  useControllableState,
  UseControllableStateProps,
} from '@chakra-ui/react'

export type SegmentItem = { id: string; label: string }

export interface SegmentedControlProps
  extends UseControllableStateProps<string> {
  segments: Array<SegmentItem>
  breakpoints?: Record<string, boolean>
  size?: 'sm' | 'md' | 'lg'
}

export const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
  const {
    segments,
    defaultValue: defaultValueProp,
    value: valueProp,
    onChange: onChangeProp,
    breakpoints = { base: true, md: false },
    size = 'sm',
  } = props
  const isMobile = useBreakpointValue(breakpoints, {
    fallback: 'lg',
  })

  const [value, setValue] = useControllableState({
    defaultValue: defaultValueProp,
    value: valueProp,
    onChange: onChangeProp,
  })

  const activeIndex = React.useMemo(
    () => segments.findIndex((segment) => segment.id === value),
    [segments, value],
  )
  const activeSegment = segments[activeIndex]

  if (isMobile) {
    return (
      <Menu>
        <MenuButton as={Button} variant="tertiary" size={size}>
          {activeSegment.label}
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuOptionGroup
              value={value}
              onChange={(value) => setValue(value.toString())}
            >
              {segments?.map(({ id, label }) => (
                <MenuItemOption key={id} value={id}>
                  {label}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Portal>
      </Menu>
    )
  }

  return (
    <Tabs
      index={activeIndex}
      onChange={(index) => setValue(segments[index].id)}
      variant="segments"
      size={size}
    >
      <TabList>
        {segments?.map(({ id, label }) => (
          <Tab key={id}>{label}</Tab>
        ))}
      </TabList>
    </Tabs>
  )
}
