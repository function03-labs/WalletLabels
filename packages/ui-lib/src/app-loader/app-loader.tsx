import { SaasUIGlyph } from '../logo/saas-ui-glyph'

import { LoadingOverlay, LoadingOverlayProps } from '@saas-ui/react'
import { keyframes } from '@chakra-ui/react'
import WalletlabelsLogo from '../../../../apps/web/src/features/common/components/Logo';

const scale = keyframes`
  0% {
    scale: 2;
  }
  100% {
    scale: 1.4;
  }
`

/**
 * Show a fullscreen loading animation while the app is loading.
 */
export const AppLoader: React.FC<LoadingOverlayProps> = (props) => {
  return (
    <LoadingOverlay
      {...props}
      variant="fullscreen"
      children={
        <WalletlabelsLogo
        boxSize="8"
        animation={`5s ease-out ${scale}`}
        opacity="0.8"
      />
      }
    />
  )
}
