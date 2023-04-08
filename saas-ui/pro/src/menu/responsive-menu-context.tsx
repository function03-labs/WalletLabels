import { createContext } from '@chakra-ui/react-utils'

export interface ResponsiveMenuContextValue {
  breakpoints: Record<string, boolean | string> | (string | boolean)[]
}

export const [ResponseMenuContext, useResponsiveMenuContext] =
  createContext<ResponsiveMenuContextValue>()
