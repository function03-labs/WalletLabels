import { As, Icon } from '@chakra-ui/react'
import { Card, CardFooter, CardProps } from '@saas-ui/react'

interface SettingsCardProps extends CardProps {
  icon?: As<any>
  footer?: React.ReactNode
}

export const SettingsCard: React.FC<SettingsCardProps> = (props) => {
  const { title, subtitle, footer, avatar, icon, children } = props
  return (
    <Card
      title={title}
      subtitle={subtitle}
      avatar={icon ? <Icon as={icon} boxSize="8" /> : avatar}
    >
      {children}
      <CardFooter px="4" py="2" justifyContent="flex-end" borderTopWidth="1px">
        {footer}
      </CardFooter>
    </Card>
  )
}
