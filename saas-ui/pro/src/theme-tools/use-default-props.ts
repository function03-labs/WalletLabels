import { ThemeTypings, useTheme } from '@chakra-ui/system'

export const useDefaultProps = <ThemeKey = keyof ThemeTypings>(
  componentName: ThemeKey,
) => {
  const theme = useTheme()
  return theme.components[componentName]?.defaultProps || {}
}
