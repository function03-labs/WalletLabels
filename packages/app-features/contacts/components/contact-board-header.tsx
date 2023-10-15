import { HStack, Icon, MenuItem, Spacer, Tag, Text } from '@chakra-ui/react'
import { ContactStatus } from './contact-status'
import { OverflowMenu } from '@saas-ui/react'
import { ContactTag } from './contact-tag'
import { ContactType } from './contact-type'
import { TagIcon } from 'lucide-react'
import { DataBoardHeaderProps } from '@ui/lib'

export const ContactBoardHeader: React.FC<DataBoardHeaderProps> = (props) => {
  const value = props.groupingValue as string
  let title

  switch (props.groupingColumnId) {
    case 'status':
      title = <ContactStatus status={value} />
      break
    case 'tags':
      title = value ? (
        <ContactTag
          tag={value}
          px="0"
          bg="transparent"
          _dark={{ bg: 'transparent', color: 'app-text' }}
        />
      ) : (
        <Tag
          size="sm"
          px="0"
          bg="transparent"
          _dark={{ bg: 'transparent', color: 'app-text' }}
        >
          <Icon as={TagIcon} fontSize="sm" me="1" />
          No tag
        </Tag>
      )
      break
    case 'type':
      title = (
        <ContactType
          type={value}
          px="0"
          bg="transparent"
          _dark={{ bg: 'transparent', color: 'app-text' }}
        />
      )
      break
  }

  return (
    <HStack w="full" py="2" px="0">
      {title}
      <Text color="muted">{(props as any).leafRows?.length}</Text>
      <Spacer />
      <OverflowMenu size="xs">
        <MenuItem>Hide</MenuItem>
      </OverflowMenu>
    </HStack>
  )
}
