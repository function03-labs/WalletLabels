import { Stack, Text, Progress } from '@chakra-ui/react'
import { usePath } from '@modules/core/hooks/use-path'
import { useBilling } from '@saas-ui/billing'
import { Flag } from '@saas-ui/features'

import differenceInDays from 'date-fns/differenceInDays'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

import { Button } from '../button'

export const BillingStatus = () => {
  const { isTrialing, trialEndsAt, currentPlan } = useBilling()

  const upgradePath = usePath('/settings/plans')

  if (!isTrialing || !currentPlan || !trialEndsAt) {
    return null
  }

  let progress
  if (currentPlan.trialDays) {
    progress =
      100 -
      (100 / currentPlan.trialDays) * differenceInDays(trialEndsAt, new Date())
  }

  return (
    <Stack spacing="4" borderTopWidth="1px" pt="4">
      <Stack direction="row" px="4" alignItems="center">
        <Text flex="1">
          Trial ends in{' '}
          <strong>{formatDistanceStrict(new Date(), trialEndsAt)}</strong>
        </Text>
        <Flag flag="billing">
          <Button href={upgradePath} variant="subtle" colorScheme="green">
            Upgrade
          </Button>
        </Flag>
      </Stack>
      {progress !== undefined && (
        <Progress
          colorScheme="green"
          size="xs"
          borderRadius="0"
          value={progress}
        />
      )}
    </Stack>
  )
}
