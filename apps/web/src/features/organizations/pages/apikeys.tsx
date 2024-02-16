'use client'

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

import { FaTelegram, FaGithub, FaTwitter } from 'react-icons/fa'

import {
  Page,
  ErrorPage,
  Toolbar,
  ToolbarButton,
  PageBody,
  PageHeader,
} from '@saas-ui-pro/react'

import { IntroTour } from '../components/intro-tour'

import { IndexedChains } from '../components/metrics/indexed-chains'
import { RevenueChart } from '../components/metrics/revenue-chart'
import { Activity } from '../components/metrics/activity'
import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '@api/client'
import { useWorkspace } from '@app/features/common/hooks/use-workspace'
import { Metric } from '../components/metrics/metric'
import {
  SegmentedControl,
  DateRangePicker,
  getRangeValue,
  DateRangePresets,
  DateRange,
  getRangeDiff,
} from '@ui/lib'
import { useEffect, useState } from 'react'
import { DataAPI } from '../components/apikeys/table'
import { MembersList } from '../components/members-list'
import { supabase } from '../../../../../../packages/app-config/src'

export function ApiKeysPage() {
  const workspace = useWorkspace()
  // console.log(users)
  const fetchCountries = async () => {
    const { data, error } = await supabase.from('countries').select('*')
    if (error) throw error
    return data
  }
  const { data: data2 } = useQuery({
    queryKey: ['countries'] as const,
    queryFn: fetchCountries,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  console.log(data2)

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
      'dashboard',
      {
        workspace,
      },
    ] as const,
    queryFn: ({ queryKey }) => getDashboard(queryKey[1]),
    enabled: !!workspace,
    refetchOnWindowFocus: false,
    refetchInterval: false,
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
        href="https://twitter.com/"
        icon={<FaTwitter />}
        label="Share on Twitter"
      />
      <ToolbarButton
        as="a"
        href="https://github.com/"
        icon={<FaGithub />}
        label="Star on Github"
      />
      <ToolbarButton
        as="a"
        href=""
        icon={<FaTelegram />}
        label="Join Telegram"
      />
      <ToolbarButton
        as="a"
        href=""
        label="Submit Labels"
        colorScheme="primary"
        variant="outline"
        className="pre-order"
      />
    </Toolbar>
  )

  return (
    <Page isLoading={isLoading}>
      <PageHeader title={organization?.name} toolbar={toolbar} />
      <PageBody
        contentWidth="container.2xl"
        bg="page-body-bg-subtle"
        py={{ base: 4, xl: 8 }}
        px={{ base: 4, xl: 8 }}
      >
        {/* <IntroTour /> */}
        <Grid
          templateColumns={['repeat(1, 1fr)', null, null, 'repeat(1, 1fr)']}
          gridAutoColumns="fr1"
          width="100%"
          gap={{ base: 4, xl: 8 }}
          pb="8"
        >
          {/* <GridItem colSpan={{ base: 1, lg: 2 }} maxW="100vw">
            <Card>
              <Tabs variant="unstyled" tabIndex={0}>
                <TabList
                  overflow="hidden"
                  borderTopRadius="md"
                  display="flex"
                  flexWrap="wrap"
                >
                  {data?.charts.map((metric) => (
                    <Tab
                      key={metric.id}
                      id={metric.id}
                      alignItems="stretch"
                      justifyContent="stretch"
                      flex={{ base: '0 0 50%', lg: '1 0 auto' }}
                      height="auto"
                      textAlign="left"
                      borderBottomWidth="1px"
                      borderRightWidth="1px"
                      _hover={{
                        bg: 'whiteAlpha.100',
                        _dark: {
                          bg: 'whiteAlpha.100',
                        },
                      }}
                      _selected={{
                        borderBottomWidth: '2px',
                        borderBottomColor: 'primary.500',
                        display: 'flex',
                      }}
                      _last={{
                        borderRightWidth: '0',
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
          </GridItem> */}
          {/* <GridItem as={IndexedChains} data={data?.walletLabels} /> */}
          <GridItem as={DataAPI} data={data?.activity} />
        </Grid>
      </PageBody>
    </Page>
  )
}
