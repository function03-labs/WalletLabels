import { Grid, GridItem } from '@chakra-ui/react'

import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

import {
  Page,
  ErrorPage,
  Toolbar,
  ToolbarButton,
  useTenant,
  PageBody,
  PageHeader,
} from '@saas-ui-pro/react'

import { IntroTour } from '../components/intro-tour'

import { SalesByCountry } from '../components/metrics/sales-by-country'
import { Today } from '../components/metrics/today'
import { MRR } from '../components/metrics/mrr'
import { Activity } from '../components/metrics/activity'
import { useQuery } from '@tanstack/react-query'
import { getOrganization } from '@api/client'

export function DashboardPage() {
  const tenant = useTenant()
  const { data, isLoading } = useQuery({
    queryKey: [
      'Organization',
      {
        slug: tenant,
      },
    ] as const,
    queryFn: ({ queryKey }) => getOrganization(queryKey[1]),
    enabled: !!tenant,
  })

  const organization = data?.organization

  if (!isLoading && !organization) {
    return (
      <ErrorPage
        title="No organization found"
        description={`We couldn't find a organization named ${tenant}`}
      />
    )
  }

  const toolbar = (
    <Toolbar className="overview-toolbar" variant="ghost">
      <ToolbarButton
        as="a"
        href="https://twitter.com/intent/tweet?text=Check%20out%20%40saas_js,%20an%20advanced%20component%20library%20for%20SaaS%20products%20build%20with%20%40chakra_ui.%20https%3A//saas-ui.dev%20"
        icon={<FaTwitter />}
        label="Share on Twitter"
      />
      <ToolbarButton
        as="a"
        href="https://github.com/saas-js/saas-ui"
        icon={<FaGithub />}
        label="Star on Github"
      />
      <ToolbarButton
        as="a"
        href="https://discord.gg/4PmJGFcAjX"
        icon={<FaDiscord />}
        label="Join Discord"
      />
      <ToolbarButton
        as="a"
        href="https://saas-ui.lemonsqueezy.com/checkout?cart=f3e5aad8-3098-44b7-a45e-46b50d664087"
        label="Buy Pro"
        colorScheme="primary"
        variant="solid"
        className="pre-order"
      />
    </Toolbar>
  )

  return (
    <Page isLoading={isLoading}>
      <PageHeader title={organization?.name} toolbar={toolbar} />
      <PageBody pt="8">
        <IntroTour />
        <Grid
          templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
          gridAutoColumns="fr1"
          width="100%"
          gap="4"
          p="4"
        >
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <Today />
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <MRR />
          </GridItem>
          <GridItem as={SalesByCountry} />
          <GridItem as={Activity} />
        </Grid>
      </PageBody>
    </Page>
  )
}
