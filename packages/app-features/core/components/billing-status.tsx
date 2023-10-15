import { Stack, Text, Progress, Card, CardBody } from '@chakra-ui/react'
import { usePath } from '@app/features/core/hooks/use-path'
import { useBilling } from '@saas-ui-pro/billing'
import { Has } from '@saas-ui-pro/feature-flags'

import { differenceInDays, formatDistanceStrict } from 'date-fns'

import { LinkButton } from '@ui/lib'

export const BillingStatus = () => {
  const { isTrialing, trialEndsAt, currentPlan } = useBilling()

  const upgradePath = usePath('/settings/plans')

  if (!isTrialing || !currentPlan || !trialEndsAt) {
    return null
  }

  let progress = 0
  if (currentPlan.trialDays) {
    progress =
      100 -
      (100 / currentPlan.trialDays) * differenceInDays(trialEndsAt, new Date())
  }

  let message
  if (progress > 100) {
    message = <Text flex="1">Your trial has ended</Text>
  } else {
    message = (
      <Text flex="1">
        Trial ends in{' '}
        <strong>{formatDistanceStrict(new Date(), trialEndsAt)}</strong>
      </Text>
    )
  }

  return (
    <Card position="relative" overflow="hidden">
      <CardBody>
        <Stack direction="row" alignItems="center">
          {message}
          <Has feature="billing">
            <LinkButton
              href={upgradePath}
              variant="solid"
              colorScheme="green"
              size="xs"
            >
              Upgrade
            </LinkButton>
          </Has>
        </Stack>
        {progress !== undefined && (
          <Progress
            position="absolute"
            bottom="0"
            right="0"
            left="0"
            colorScheme="green"
            bg="sidebar-on-muted"
            size="xs"
            borderRadius="0"
            value={progress}
          />
        )}
      </CardBody>
    </Card>
  )
}
