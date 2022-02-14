import { useRouter } from 'next/router'
import { useGetOrganizationQuery } from '@app/graphql'

import {
  Box,
  Text,
  Flex,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
} from '@chakra-ui/react'

import { FiShare, FiShare2, FiFilter } from 'react-icons/fi'

import {
  Page,
  ErrorPage,
  Toolbar,
  ToolbarButton,
  BackButton,
  Section,
  Tour,
  Sparklines,
} from '@saas-ui/pro'

import { Card, CardBody, DataTable } from '@saas-ui/react'

const steps = [
  {
    target: '.appulse-tour-revenue',
    title: 'Switch projects',
    content: 'This is my awesome feature!',
  },
  {
    target: '.appulse-tour-customers',
    title: 'Edit your profile',
    content: 'This is another awesome feature!',
  },
  {
    target: '.appulse-tour-users',
    title: 'Upgrade your account',
    content: 'This is another awesome feature!',
  },
]

export function OverviewPage() {
  const router = useRouter()
  const { tenant } = router.query
  const { data, isLoading } = useGetOrganizationQuery({
    slug: String(tenant),
  })

  if (!isLoading && (!data?.organization || typeof tenant !== 'string')) {
    return (
      <ErrorPage
        title="No organization found"
        description={`We couldn't find a organization named ${tenant}`}
      />
    )
  }

  const organization = data?.organization

  const runTour = true // get value from user profile
  const onTourComplete = () => {
    console.log('Tour complete')
    // update user profile
  }

  const toolbar = (
    <Toolbar>
      <ToolbarButton icon={<FiFilter />} label="Filter" />
      <ToolbarButton icon={<FiShare />} label="Share" />
      <ToolbarButton
        leftIcon={<FiShare2 />}
        label="Export"
        variant="solid"
        flexShrink={0}
      />
    </Toolbar>
  )

  return (
    <Page title={organization?.name} toolbar={toolbar} isLoading={isLoading}>
      <Tour
        continuous
        steps={steps}
        run={runTour}
        showSkipButton
        disableOverlay
        onComplete={onTourComplete}
      />
      <Flex wrap="wrap" p="4">
        <Section size={1 / 3}>
          <Card>
            <CardBody>
              <Stat className="appulse-tour-revenue">
                <StatLabel>Revenue</StatLabel>
                <StatNumber>€43.400</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23%
                </StatHelpText>

                <Sparklines
                  data={[10, 3, 7, 14, 6, 9, 12]}
                  limit={7}
                  height={20}
                  color="yellow"
                />
              </Stat>
            </CardBody>
          </Card>
        </Section>
        <Section size={1 / 3}>
          <Card>
            <CardBody>
              <Stat className="appulse-tour-customers">
                <StatLabel>New customers</StatLabel>
                <StatNumber>130</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  29%
                </StatHelpText>

                <Sparklines
                  data={[20, 14, 10, 18, 24, 10, 16]}
                  limit={7}
                  height={20}
                  color="pink"
                />
              </Stat>
            </CardBody>
          </Card>
        </Section>
        <Section size={1 / 3}>
          <Card>
            <CardBody>
              <Stat className="appulse-tour-users">
                <StatLabel>Active users</StatLabel>
                <StatNumber>5304</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  10%
                </StatHelpText>

                <Sparklines
                  data={[11, 5, 8, 15, 20, 25, 12]}
                  limit={7}
                  height={20}
                  color="green"
                />
              </Stat>
            </CardBody>
          </Card>
        </Section>
        <Section size={1 / 2}>
          <Card title={<Text>Sales by country</Text>}>
            <DataTable
              columns={[
                {
                  id: 'country',
                  Header: 'Country',
                },
                {
                  id: 'sales',
                  Header: 'Sales',
                },
                {
                  id: 'revenue',
                  Header: 'Revenue',
                },
              ]}
              data={[
                {
                  id: 'us',
                  country: 'US',
                  sales: 454433,
                  revenue: '€244543,-',
                },
                {
                  id: 'nl',
                  country: 'Netherlands',
                  sales: 3232,
                  revenue: '€54432,-',
                },
                {
                  id: 'Germany',
                  country: 'Germany',
                  sales: 2343,
                  revenue: '€34842,-',
                },
              ]}
            />
          </Card>
        </Section>
        <Section size={1 / 2}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Billing plan</StatLabel>
                <StatNumber>Professional</StatNumber>
                <StatHelpText opacity="0.6">
                  5304 / 10000 active users
                </StatHelpText>
              </Stat>
              <Progress value={53} colorScheme="primary" size="xs"></Progress>
            </CardBody>
          </Card>
        </Section>
      </Flex>
    </Page>
  )
}
