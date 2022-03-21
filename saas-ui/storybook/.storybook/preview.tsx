import {
  extendTheme,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { StoryContext } from '@storybook/react'
import * as React from 'react'

import { FiMoon, FiSun } from 'react-icons/fi'
import { withPerformance } from 'storybook-addon-performance'

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { SaasProvider } from '@saas-ui/react'
import { theme } from '@saas-ui/pro'

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    storySort: {
      order: ['Introduction', 'Changelog', 'Getting started'],
    },
  },
}

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
}

const ThemeSelect = ({ value, onChange }) => {
  const themes = ['Saas UI Pro']
  return (
    <Menu>
      <MenuButton>Theme: {themes[value]}</MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue={value} type="radio" onChange={onChange}>
          <MenuItemOption value="0">Saas UI Pro</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FiMoon, FiSun)
  const nextMode = useColorModeValue('dark', 'light')

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${nextMode} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  )
}

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const [themeId, setTheme] = React.useState(
    localStorage.getItem('storybook.theme') || '0',
  )
  const { direction } = context.globals
  const dir = direction.toLowerCase()

  const getTheme = React.useCallback(() => {
    if (themeId === '1') {
      return theme
    }
    return theme
  }, [themeId])

  return (
    <SaasProvider theme={extendTheme({ ...getTheme(), direction: dir })}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
        <Flex
          justify="flex-end"
          mb={4}
          position="fixed"
          zIndex="overlay"
          top="0"
          right="0"
        >
          <ThemeSelect
            value={themeId}
            onChange={(id) => {
              setTheme(id)
              localStorage.setItem('storybook.theme', id)
            }}
          />
          <ColorModeToggle />
        </Flex>
        <StoryFn />
      </div>
    </SaasProvider>
  )
}

export const decorators = [withChakra, withPerformance]
