import { Button, ButtonProps } from '@chakra-ui/react'

interface UpgradeButtonProps extends ButtonProps {
  projectId: string
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  projectId,
  ...props
}) => {
  const redirectToCheckout = () => null

  return (
    <Button onClick={redirectToCheckout} colorScheme="green" {...props}>
      Upgrade
    </Button>
  )
}
