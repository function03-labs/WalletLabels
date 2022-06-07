import { chakra, extendTheme, useColorMode } from '@chakra-ui/react'
import { StoryContext } from '@storybook/react'
import * as React from 'react'

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { SaasProvider } from '@saas-ui/react'
import { theme as proTheme } from '@saas-ui/pro'

import '@fontsource/inter/variable.css'

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    storySort: {
      order: ['Getting Started', ['Welcome', 'Installation', 'Theme']],
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
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'pro',
    toolbar: {
      icon: 'paintbrush',
      items: ['pro'],
      showName: true,
    },
  },
  colorMode: {
    name: 'ColorMode',
    description: 'Color mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
}

const ColorModeToggle = ({ colorMode }) => {
  const { setColorMode } = useColorMode()

  React.useEffect(() => {
    setColorMode(colorMode)
  }, [colorMode])

  return null
}

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { theme: themeId, colorMode } = context.globals

  const { direction } = context.globals
  const dir = direction.toLowerCase()

  const getTheme = React.useCallback(() => {
    if (themeId === 'pro') {
      return proTheme
    }
    return proTheme
  }, [themeId])

  const theme = getTheme()
  return (
    <SaasProvider
      theme={extendTheme(
        {
          ...theme,
          direction: dir,
        },
        {
          styles: {
            global: { 'html, body, #root': { height: '100%' } },
          },
        },
      )}
    >
      <chakra.div dir={dir} id="story-wrapper" height="100%">
        <ColorModeToggle colorMode={colorMode} />
        <StoryFn />
      </chakra.div>
    </SaasProvider>
  )
}

export const decorators = [withChakra]
