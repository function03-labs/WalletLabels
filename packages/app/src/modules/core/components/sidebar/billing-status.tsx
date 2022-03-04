import { Stack, Text, Progress } from '@chakra-ui/react'

import { UpgradeButton } from '@saas-ui/pro'

export const BillingStatus = () => {
  return (
    <Stack spacing="4">
      <Stack direction="row" px="4" alignItems="center">
        <Text flex="1">
          Plan: <strong>Professional</strong>
        </Text>

        <UpgradeButton variant="subtle" />
      </Stack>
      <Progress colorScheme="green" size="xs" borderRadius="0" value={53} />
    </Stack>
  )
}
