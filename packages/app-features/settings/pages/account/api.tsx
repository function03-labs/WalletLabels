import { Button, IconButton, Stack, Text, useClipboard } from '@chakra-ui/react'
import {
  StructuredList,
  StructuredListCell,
  StructuredListItem,
} from '@saas-ui/react'
import {
  Section,
  SectionBody,
  SectionHeader,
  SectionDescription,
} from '@saas-ui-pro/react'

import { SettingsPage, Link } from '@ui/lib'
import { SettingsCard } from '@app/features/settings/components/settings-card'
import { FiCopy, FiCheck, FiX } from 'react-icons/fi'

function AccessToken({ token, onRemove }: any) {
  const { value, onCopy, hasCopied } = useClipboard(token)

  const handleRemove = () => {
    onRemove?.(token)
  }

  return (
    <StructuredListItem onClick={onCopy}>
      <StructuredListCell flex="1">
        <Text size="sm">{token}</Text>
      </StructuredListCell>
      <StructuredListCell px="4">
        {hasCopied ? <FiCheck /> : <FiCopy />}
      </StructuredListCell>
      <StructuredListCell>
        <IconButton
          icon={<FiX />}
          aria-label="Remove access token"
          variant="ghost"
          onClick={handleRemove}
        />
      </StructuredListCell>
    </StructuredListItem>
  )
}

function PersonalAccessTokens() {
  const onRemove = () => null

  return (
    <Section variant="annotated">
      <SectionHeader
        title="Personal access tokens"
        description={
          <SectionDescription>
            <Text>Use personal access tokens to access the API.</Text>
            <Link href="#">Read documentation</Link>
          </SectionDescription>
        }
      />
      <SectionBody>
        <SettingsCard
          footer={<Button colorScheme="primary">Create new token</Button>}
        >
          <StructuredList variant="settings" p="0">
            <AccessToken token="12345" onRemove={onRemove} />
          </StructuredList>
        </SettingsCard>
      </SectionBody>
    </Section>
  )
}

export function AccountApiPage() {
  return (
    <SettingsPage title="API access" description="Access the Saas UI API.">
      <PersonalAccessTokens />
    </SettingsPage>
  )
}
