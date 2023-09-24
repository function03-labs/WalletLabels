import {
  Card,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'

import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

import {
  Page,
  ErrorPage,
  Toolbar,
  ToolbarButton,
  PageBody,
  PageHeader,
} from '@saas-ui-pro/react'

import { IntroTour } from '../components/intro-tour'

import { SalesByCountry } from '../components/metrics/sales-by-country'
import { RevenueChart } from '../components/metrics/revenue-chart'
import { Activity } from '../components/metrics/activity'
import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '@api/client'
import { useWorkspace } from '@app/features/core/hooks/use-workspace'
import { Metric } from '../components/metrics/metric'
import {
  SegmentedControl,
  DateRangePicker,
  getRangeValue,
  DateRangePresets,
  DateRange,
  getRangeDiff,
} from '@ui/lib'
import { useState } from 'react'

export function DashboardPage() {
  const workspace = useWorkspace()

  const [range, setRange] = useState('30d')
  const [dateRange, setDateRange] = useState(getRangeValue('30d'))
  const onPresetChange = (preset: string) => {
    if (preset !== 'custom') {
      setDateRange(getRangeValue(preset as DateRangePresets))
    }
    setRange(preset)
  }

  const onRangeChange = (range: DateRange) => {
    const diff = getRangeDiff(range)
    if ([1, 3, 7, 30].includes(diff)) {
      setRange(`${diff}`)
    } else {
      setRange('custom')
    }

    setDateRange(range)
  }

  const { data, isLoading } = useQuery({
    queryKey: [
      'Dashboard',
      {
        workspace,
        startDate: dateRange.start.toString(),
        endDate: dateRange.end.toString(),
      },
    ] as const,
    queryFn: ({ queryKey }) => getDashboard(queryKey[1]),
    enabled: !!workspace,
  })

  const organization = data?.organization

  if (!isLoading && !organization) {
    return (
      <ErrorPage
        title="No organization found"
        description={`We couldn't find a organization named ${workspace}`}
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
        href="https://saas-ui.lemonsqueezy.com/checkout/buy/5c76854f-738a-46b8-b32d-932a97d477f5"
        label="Buy Pro"
        colorScheme="primary"
        variant="solid"
        className="pre-order"
      />
    </Toolbar>
  )

  const footer = (
    <Toolbar justifyContent="flex-start" variant="tertiary" size="xs">
      <SegmentedControl
        segments={[
          {
            id: '1d',
            label: '1d',
          },
          {
            id: '3d',
            label: '3d',
          },
          {
            id: '7d',
            label: '7d',
          },
          { id: '30d', label: '30d' },
          { id: 'custom', label: 'Custom' },
        ]}
        value={range}
        onChange={onPresetChange}
      />
      <DateRangePicker value={dateRange} onChange={onRangeChange} />
    </Toolbar>
  )

  return (
    <Page isLoading={isLoading}>
      <PageHeader
        title={organization?.name}
        toolbar={toolbar}
        footer={footer}
      />
      <PageBody contentWidth="full">
        <IntroTour />
        <Grid
          templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
          gridAutoColumns="fr1"
          width="100%"
          gap="4"
        >
          <GridItem colSpan={{ base: 1, lg: 2 }} maxW="100vw">
            <Card>
              <Tabs variant="unstyled" tabIndex={0}>
                <TabList>
                  {data?.charts.map((metric) => (
                    <Tab
                      key={metric.id}
                      id={metric.id}
                      display="flex"
                      alignItems="stretch"
                      justifyContent="stretch"
                      flex="1"
                      height="auto"
                      textAlign="left"
                      borderBottomWidth="1px"
                      _selected={{
                        borderBottomWidth: '2px',
                        borderColor: 'primary.500',
                      }}
                    >
                      <Metric {...metric} />
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {data?.charts.map((metric) => (
                    <TabPanel key={metric.id} pt="8">
                      <RevenueChart data={metric.data} />
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </Card>
          </GridItem>
          <GridItem as={SalesByCountry} data={data?.sales} />
          <GridItem as={Activity} data={data?.activity} />
        </Grid>
      </PageBody>
    </Page>
  )
}
