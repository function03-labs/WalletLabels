import { getOrganization,getOrganizations } from './organizations'
import { User } from './types';

export interface GetDashboardVariables {
  workspace: string
  user: any
}

export const getDashboard = async (variables: GetDashboardVariables) => {
  const { workspace, user } = variables

  return {
    organization: (await getOrganization({ slug: workspace, user:user })).organization,
    walletLabels
  }
}


const walletLabels = [
  {
    id: 'eth',
    chain: 'Ethereum',
    activeWallets: Math.floor(Math.random() * 500),
    labels: Math.floor(Math.random() * (40000000 - 1000000 + 1)) + 1000000,
  },
  {
    id: 'op',
    chain: 'Optimism',
    activeWallets: Math.floor(Math.random() * 400),
    labels: Math.floor(Math.random() * (40000000 - 1000000 + 1)) + 1000000,
  },
  {
    id: 'arb',
    chain: 'Arbitrum',
    activeWallets: Math.floor(Math.random() * 300),
    labels: Math.floor(Math.random() * (40000000 - 1000000 + 1)) + 1000000,
  },
  {
    id: 'poly',
    chain: 'Polygon',
    activeWallets: Math.floor(Math.random() * 250),
    labels: Math.floor(Math.random() * (40000000 - 1000000 + 1)) + 1000000,
  },
  {
    id: 'sol',
    chain: 'Solana',
    activeWallets: Math.floor(Math.random() * 200),
    labels: Math.floor(Math.random() * (40000000 - 1000000 + 1)) + 1000000,
  }
]



