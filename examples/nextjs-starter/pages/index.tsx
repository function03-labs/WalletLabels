import { Heading, Text } from '@chakra-ui/react'
import { AppShell } from '@saas-ui/pro'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <AppShell>
      <Heading>Saas UI Pro</Heading>
      <Text>Next.js - Starter</Text>
    </AppShell>
  )
}

export default Home
