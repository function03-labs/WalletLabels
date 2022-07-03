import { mergeWith, memoizedGet as get, Dict } from '@chakra-ui/utils'
import {
  SemanticValue,
  mergeThemeOverride,
  ThemeExtension,
  Pseudos,
} from '@chakra-ui/react'
import { setLightness, transparentize, parseToHsl } from 'polished'

const createGrayShades = (color: string, theme: Dict<any>) => {
  const shades = theme.colors.gray as Record<string, string>

  const gray: Record<string, string> = {}

  for (const shade in shades) {
    gray[shade] = setLightness(parseToHsl(shades[shade]).lightness, color)
  }

  return gray
}

type ColorSchemeToken = string | SemanticValue<keyof Pseudos>

export interface ThemeColors {
  'app-background': ColorSchemeToken
  'app-text'?: ColorSchemeToken
  'sidebar-background'?: ColorSchemeToken
  'sidebar-text'?: ColorSchemeToken
  'sidebar-border-color'?: ColorSchemeToken
  'sidebar-muted'?: ColorSchemeToken
  'sidebar-on-muted'?: ColorSchemeToken
  'sidebar-on-subtle'?: ColorSchemeToken
}

const transparentizeToken = (
  token: ColorSchemeToken,
  amount: number,
  theme: Dict<any>,
) => {
  if (typeof token === 'string') {
    return transparentize(amount, get(theme, `colors.${token}`, token))
  }

  return Object.fromEntries(
    Object.entries(token).map(([key, value]) => {
      return [key, transparentize(amount, value)]
    }),
  )
}

export interface ThemeColorsOptions {
  /**
   * The theme color tokens.
   */
  tokens: ThemeColors
  /**
   * Override individual theme color tokens.
   */
  colors?: Dict<any>
  /**
   * Generate gray hues (50 - 900) based on this color.
   */
  grayTint?: string
}

const createColorScheme = (
  { colors, tokens, grayTint }: ThemeColorsOptions,
  theme: Dict<any>,
) => {
  const gray = grayTint && createGrayShades(grayTint, theme)

  return {
    colors: {
      ...colors,
      gray,
    },
    semanticTokens: {
      colors: mergeWith(
        {},
        tokens['sidebar-text']
          ? {
              'sidebar-border-color': transparentizeToken(
                tokens['sidebar-text'],
                0.9,
                theme,
              ),
              'sidebar-muted': transparentizeToken(
                tokens['sidebar-text'],
                0.4,
                theme,
              ),
              'sidebar-on-muted': transparentizeToken(
                tokens['sidebar-text'],
                0.9,
                theme,
              ),
              'sidebar-on-subtle': transparentizeToken(
                tokens['sidebar-text'],
                0.8,
                theme,
              ),
              'sidebar-on': transparentizeToken(
                tokens['sidebar-text'],
                0.7,
                theme,
              ),
            }
          : {},
        tokens,
      ),
    },
  }
}

export const withThemeColors = (
  options: ThemeColorsOptions,
): ThemeExtension => {
  return (theme) => {
    const colorScheme = createColorScheme(options, theme)
    return mergeThemeOverride(theme, colorScheme)
  }
}
