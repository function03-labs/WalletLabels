import * as React from 'react'
import { BackButton, Page, useTenant } from '@saas-ui/pro'
import { InlineCheckout } from '@saas-ui/paddle'
import { Loader, EmptyState, useSnackbar } from '@saas-ui/react'
import { useNavigate } from '@saas-ui/router'
import { useGetOrganizationQuery } from '@app/graphql'
import { usePath } from '@modules/core/hooks/use-path'
import { useBilling } from '@saas-ui/billing'
import { Button } from '@modules/core/components/button'
import { Container, Heading, HStack, Stack, Text } from '@chakra-ui/react'

interface CheckoutPageProps {
  plan: string
}

export function CheckoutPage({ plan }: CheckoutPageProps) {
  const tenant = useTenant()
  const settingsPath = usePath('/settings/plans')
  const [isReady, setReady] = React.useState(false)

  const { plans } = useBilling()

  const selectedPlan = plans.find(({ id }) => id === plan)

  const { data: { organization } = {}, isLoading } = useGetOrganizationQuery({
    slug: tenant,
  })

  const navigate = useNavigate()

  const snackbar = useSnackbar()

  const onSuccess = (data: any) => {
    snackbar.success({
      title: 'Upgrade successful',
      description: `Your account has been upgraded to ${data.product.name}`,
    })
    onClose()
  }

  const onClose = () => {
    navigate(`/app/${tenant}/settings/billing`)
  }

  const onLoad = () => {
    setReady(true)
  }

  let body
  if (!selectedPlan) {
    body = (
      <EmptyState
        title="Invalid billing plan"
        description="We couldn't find a plan you're looking for."
        height="100%"
        actions={
          <>
            <Button href={settingsPath}>Go back</Button>
          </>
        }
      />
    )
  } else {
    body = (
      <>
        <Loader variant="overlay" isLoading={isLoading || !isReady} />
        <HStack width="full" alignItems="flex-start" py={[8, null, 20]}>
          <Stack flex="1" spacing="0" py={[8, null, 20]}>
            <Text fontSize="xl" color="muted">
              {selectedPlan && `Subscribe to ${selectedPlan.name}`}
            </Text>
            <HStack>
              <Text fontSize="4xl" fontWeight="bold">
                {selectedPlan.price}
              </Text>
              <Text fontSize="lg" color="muted">
                {selectedPlan.period === 'monthly' ? 'per month' : 'per year'}
              </Text>
            </HStack>
          </Stack>
          <InlineCheckout
            display={isReady ? 'block' : 'none'}
            flex="1"
            product={selectedPlan.productId}
            allowQuantity={false}
            quantity={organization?.members.length}
            email={organization?.email || undefined}
            passthrough={organization?.id}
            successCallback={onSuccess}
            closeCallback={onClose}
            loadCallback={onLoad}
          />
        </HStack>
      </>
    )
  }

  return (
    <Page
      title="Checkout"
      description={selectedPlan && `Subscribe to ${selectedPlan.name}`}
      nav={<BackButton href={settingsPath} />}
      contentWidth="container.xl"
    >
      {body}
    </Page>
  )
}
