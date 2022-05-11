import { Button, ButtonProps } from '@chakra-ui/react'

interface UpgradeButtonProps extends ButtonProps {}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({ ...props }) => {
  return (
    <Button colorScheme="green" {...props}>
      Upgrade
    </Button>
  )
}
