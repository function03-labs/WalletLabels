import { Box } from '@chakra-ui/react'
import { isElectron } from '@saas-ui-pro/react'

/**
 * Render a draggable area when running in Electron.
 * This is used at the top of the Sidebar.
 */
export const ElectronNav = () => {
  if (!isElectron()) {
    return null
  }

  return (
    <Box
      height="20px"
      sx={{
        '-webkit-user-select': 'none',
        '-webkit-app-region': 'drag',
      }}
    ></Box>
  )
}
