import { Stack, Text, useClipboard } from '@chakra-ui/react'
import { Button, IconButton, List, ListItem } from '@saas-ui/react'
import { Section } from '@saas-ui/pro'

import { SettingsPage } from '@app/features/core/components/settings-page'
import { SettingsCard } from '@app/features/settings/components/settings-card'
import { FiCopy, FiCheck, FiX } from 'react-icons/fi'
import { Link } from '@app/features/core/components/link'

function AccessToken({ token, onRemove }: any) {
  const { value, onCopy, hasCopied } = useClipboard(token)

  const handleRemove = () => {
    onRemove?.(token)
  }

  return (
    <ListItem
      primary={token}
      tertiary={hasCopied ? <FiCheck /> : <FiCopy />}
      onClick={onCopy}
      action={
        <IconButton
          icon={<FiX />}
          aria-label="Remove access token"
          onClick={handleRemove}
        />
      }
    />
  )
}

function PersonalAccessTokens() {
  const onRemove = () => null

  return (
    <Section
      title="Personal access tokens"
      description={
        <Stack spacing="2">
          <Text>Use personal access tokens to access the API.</Text>
          <Link href="#">Read documentation</Link>
        </Stack>
      }
      isAnnotated
    >
      <SettingsCard
        footer={<Button label="Create new token" colorScheme="primary" />}
      >
        <List variant="settings" p="0">
          <AccessToken token="12345" onRemove={onRemove} />
        </List>
      </SettingsCard>
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
