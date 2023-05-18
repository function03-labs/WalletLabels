import * as React from 'react'
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
import {
  BaseDrawer,
  BaseDrawerProps,
  HotkeysList,
  HotkeysListItems,
  HotkeysSearch,
  useHotkeysContext,
} from '@saas-ui/react'
import { FiHelpCircle, FiKey } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa'
import { BackButton } from '@saas-ui-pro/react'

import { useModals } from '../modals'

export const useHelpCenter = () => {
  const modals = useModals()

  const modalRef = React.useRef<number | string | null>(null)

  return {
    open: () => {
      if (!modalRef.current) {
        modalRef.current = modals.open({
          title: 'Help Center',
          component: HelpCenterDialog,
          onClose: () => {
            modalRef.current = null
          },
        })
      }
    },
    close: () => {
      modals.closeAll()
      modalRef.current = null
    },
  }
}

export interface HelpCenterProps {
  children: React.ReactNode
}

export interface HelpCenterDialogProps
  extends Omit<BaseDrawerProps, 'children'> {}

export const HelpCenterDialog: React.FC<HelpCenterDialogProps> = (props) => {
  const { title: titleProp = 'Help', ...rest } = props

  const [view, setView] = React.useState<'help' | 'keyboard'>('help')

  const back = () => setView('help')

  let content
  let title = titleProp || 'Help'
  if (view === 'keyboard') {
    title = (
      <>
        <BackButton onClick={back} /> {title}
      </>
    )
    content = <HotkeysView />
  } else {
    content = (
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
          onClick={() => setView('keyboard')}
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
    )
  }

  return (
    <BaseDrawer title={title} {...rest}>
      <DrawerBody>{content}</DrawerBody>
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
  const { icon, title, description, href = '#', ...rest } = props
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

const HotkeysView: React.FC = () => {
  const searchRef = React.useRef<HTMLInputElement | null>(null)

  const { hotkeys } = useHotkeysContext()
  return (
    <HotkeysList hotkeys={hotkeys}>
      <HotkeysSearch ref={searchRef} />
      <HotkeysListItems />
    </HotkeysList>
  )
}
