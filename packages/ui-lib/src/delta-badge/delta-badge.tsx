import { Badge, BadgeProps, Icon } from '@chakra-ui/react'
import { TrendingUpIcon, TrendingDownIcon, ArrowRightIcon } from 'lucide-react'

const getDeltaIcon = (type: string) => {
  switch (type) {
    case 'increase':
      return <Icon as={TrendingUpIcon} />
    case 'decrease':
      return <Icon as={TrendingDownIcon} />
    case 'neutral':
    default:
      return <Icon as={ArrowRightIcon} />
  }
}

const getDeltaColor = (type: string, isIncreasePositive: boolean = true) => {
  switch (type) {
    case 'increase':
      return isIncreasePositive ? 'green' : 'red'
    case 'decrease':
      return isIncreasePositive ? 'red' : 'green'
    case 'neutral':
    default:
      return 'gray'
  }
}

export const DeltaBadge: React.FC<
  BadgeProps & { deltaType?: string; isIncreasePositive?: boolean }
> = (props) => {
  const { deltaType = 'neutral', isIncreasePositive, ...rest } = props

  return (
    <Badge
      {...rest}
      colorScheme={getDeltaColor(deltaType, isIncreasePositive)}
      variant="subtle"
      display="inline-flex"
      alignItems="center"
      gap="1"
      rounded="full"
      px="2"
    >
      {getDeltaIcon(deltaType)}
      {props.children}
    </Badge>
  )
}
