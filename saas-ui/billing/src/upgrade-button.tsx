import { Button, ButtonProps } from '@chakra-ui/react'

interface UpgradeButtonProps extends ButtonProps {}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({ ...props }) => {
  const redirectToCheckout = () => null

  return (
    <Button onClick={redirectToCheckout} colorScheme="green" {...props}>
      Upgrade
    </Button>
  )
}
