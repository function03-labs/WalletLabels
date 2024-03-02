'use client'

import {
  Grid,
  GridItem,
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

import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '@api/client'
import { useWorkspace } from '@app/features/common/hooks/use-workspace'
import { useEffect, useState } from 'react'
import { DataAPI } from '../components/apikeys/table'
import { MembersList } from '../components/members-list'
import { supabase } from '../../../../../../packages/app-config/src'
import { useCurrentUser } from '@app/features/common/hooks/use-current-user'

export function ApiKeysPage() {
  const { data: user } = useCurrentUser() // Destructure to get data and isLoading
  const workspace = useWorkspace();

  const { data, isLoading } = useQuery({
    queryKey: [
      'dashboard',
      {
        workspace,
        user,
      },
    ] as const,
    queryFn: ({ queryKey }) => getDashboard(queryKey[1]),
    enabled: !!workspace,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  const organization = data?.organization ;



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
        href="https://twitter.com/walletlabels"
        icon={<FaTwitter />}
        label="Share on Twitter"
      />
      <ToolbarButton
        as="a"
        href="https://github.com/0xaaiden/WalletLabels"
        icon={<FaGithub />}
        label="Star on Github"
      />
      <ToolbarButton
        as="a"
        href="https://t.me/+yDF9bnv2R7RkNWZk"
        icon={<FaTelegram />}
        label="Join Telegram"
      />
      {/* <ToolbarButton
        as="a"
        href=""
        label="Submit Labels"
        colorScheme="primary"
        variant="outline"
        className="pre-order"
      /> */}
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
          <GridItem><DataAPI organization={organization} /></GridItem>
        </Grid>
      </PageBody>
    </Page>
  )
}
