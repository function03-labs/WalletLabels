import {
  As,
  Card,
  CardProps,
  Stack,
  Icon,
  HStack,
  CardBody,
  DrawerBody,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { BaseDrawer, BaseDrawerProps, useLink, useModals } from '@saas-ui/react'
import { FiHelpCircle, FiKey } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa'

export interface HelpCenterProps extends BaseDrawerProps {}

export const HelpCenter: React.FC<HelpCenterProps> = (props) => {
  const { title = 'Help', ...rest } = props

  return (
    <BaseDrawer title={title} {...rest}>
      <DrawerBody>
        <Stack height="100%">
          <HelpCard
            title="Documentation"
            icon={FiHelpCircle}
            href="https://saas-ui.dev/docs"
            target="_blank"
          />
          <HelpCard
            title="Keyboard shortcuts"
            icon={FiKey}
            href="https://saas-ui.dev/docs"
            // onClick={() => }
          />

          <Spacer />
          <HelpCard
            title="Discord"
            description="Join our Discord community"
            icon={FaDiscord}
            href="https://discord.gg/4PmJGFcAjX"
            target="_blank"
          />
        </Stack>
      </DrawerBody>
    </BaseDrawer>
  )
}

const HelpCard: React.FC<
  CardProps & {
    title: React.ReactNode
    icon: As
    href?: string
    target?: string
    description?: string
  }
> = (props) => {
  const { icon, title, description, href, ...rest } = props
  return (
    <Card
      as="a"
      href={href}
      {...rest}
      variant="elevated"
      bg="whiteAlpha.200"
      _hover={{ bg: 'whiteAlpha.300' }}
    >
      <CardBody py="2" display="flex" flexDirection="row" gap="3">
        <Icon as={icon} color="primary.400" boxSize="4" mt="0.5" />
        <Stack flexDirection="column" spacing="0">
          <Text>{title}</Text>
          {description && <Text color="muted">{description}</Text>}
        </Stack>
      </CardBody>
    </Card>
  )
}

// export const useHelpCenter = () => {
//   const modals = useModals()

//   return {
//     open: () =>
//       modals.open(HelpCenter, {
//         title: 'Help Center',
//       }),
//   }
// }
