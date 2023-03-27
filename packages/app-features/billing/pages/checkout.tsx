import * as React from 'react'
import { BackButton, Page, PageBody, useTenant } from '@saas-ui/pro'
import { InlineCheckout, usePaddle } from '@saas-ui/paddle'
import {
  LoadingOverlay,
  LoadingSpinner,
  EmptyState,
  useSnackbar,
  Link,
} from '@saas-ui/react'
import { useNavigate } from '@saas-ui/router'
import { usePath } from '@app/features/core/hooks/use-path'
import { useBilling } from '@saas-ui/billing'
import { LinkButton } from '@ui/lib'
import {
  Card,
  CardBody,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { FormattedNumber } from '@app/i18n'
import { useQuery } from '@tanstack/react-query'
import { getOrganization } from '@api/client'

interface CheckoutPageProps {
  plan: string
}

export function CheckoutPage({ plan }: CheckoutPageProps) {
  const tenant = useTenant()
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const settingsPath = usePath('/settings/plans')
  const [isReady, setReady] = React.useState(false)

  const { plans } = useBilling()

  const selectedPlan = plans.find(({ id }) => id === plan)

  const { data: { organization } = {}, isLoading } = useQuery({
    queryKey: ['GetOrganization', { slug: tenant }] as const,
    queryFn: ({ queryKey }) => getOrganization(queryKey[1]),
  })

  const [checkoutData, setCheckoutData] = React.useState<any>(null)

  const result = usePaddle({
    onEvent: ({ detail }) => {
      setCheckoutData(detail.eventData.checkout)
    },
  })

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

  const period = selectedPlan?.period === 'monthly' ? 'per month' : 'per year'

  let body
  if (!selectedPlan) {
    body = (
      <EmptyState
        title="Invalid billing plan"
        description="We couldn't find a plan you're looking for."
        height="100%"
        actions={
          <>
            <LinkButton href={settingsPath}>Go back</LinkButton>
          </>
        }
      />
    )
  } else {
    const prices = checkoutData?.prices.customer || {}
    const currency = prices.currency || 'EUR'
    body = (
      <>
        <LoadingOverlay variant="fill" isLoading={isLoading || !isReady}>
          <LoadingSpinner />
        </LoadingOverlay>
        <Stack
          direction={['column-reverse', null, 'row']}
          width="full"
          alignItems={['stretch', null, 'flex-start']}
          py={[8, null, 20]}
          px="2"
          spacing={20}
        >
          <Stack flex="1" spacing="0" py={[8, null, 20]}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Your subscription</Th>
                  <Th isNumeric>{period}</Th>
                </Tr>
              </Thead>
              <Tfoot>
                <Tr>
                  <Td border="0">VAT</Td>
                  <Td border="0" isNumeric>
                    <FormattedNumber
                      value={prices.total_tax}
                      style="currency"
                      currency={currency}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th border="0" color="inherit">
                    Total due
                  </Th>
                  <Th border="0" color="inherit" isNumeric>
                    <FormattedNumber
                      value={prices.total}
                      style="currency"
                      currency={currency}
                    />
                  </Th>
                </Tr>
              </Tfoot>
              <Tbody>
                <Tr>
                  <Td border="0">
                    {selectedPlan.name}{' '}
                    <Link href={settingsPath} color="muted">
                      (Change plan)
                    </Link>
                  </Td>
                  <Td border="0" />
                </Tr>
                <Tr>
                  <Td ps="8" py="2" border="0">
                    {organization?.members.length} users
                  </Td>
                  <Td isNumeric py="2" border="0">
                    <FormattedNumber
                      value={
                        parseFloat(prices.total) - parseFloat(prices.total_tax)
                      }
                      style="currency"
                      currency={currency}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td border="0" py="2" />
                  <Td border="0" py="2" />
                </Tr>
              </Tbody>
            </Table>
          </Stack>
          <Card flex="1">
            <CardBody>
              <HStack px="2">
                <Text flex="1">Price</Text>
                <Text>
                  <FormattedNumber
                    value={prices.total}
                    style="currency"
                    currency={currency}
                  />{' '}
                  {period}
                </Text>
              </HStack>
              <InlineCheckout
                display={isReady ? 'block' : 'none'}
                product={selectedPlan.productId}
                allowQuantity={false}
                quantity={organization?.members.length}
                email={organization?.email || undefined}
                passthrough={organization?.id}
                successCallback={onSuccess}
                closeCallback={onClose}
                loadCallback={onLoad}
              />
            </CardBody>
          </Card>
        </Stack>
      </>
    )
  }

  return (
    <Page
      title="Checkout"
      description={selectedPlan && `Subscribe to ${selectedPlan.name}`}
      nav={<BackButton href={settingsPath} />}
    >
      <PageBody contentWidth="container.2xl">{body}</PageBody>
    </Page>
  )
}
