import { eachDayOfInterval, format } from 'date-fns'
import { getOrganization } from './organizations'

export interface GetDashboardVariables {
  workspace: string

}

export const getDashboard = async (variables: GetDashboardVariables) => {
  const { workspace } = variables

  return {
    organization: (await getOrganization({ slug: workspace })).organization,
    walletLabels,
    activity,
  }
}


export interface MetricData {
  timestamp: number
  value: number
}

const metrics = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '€43.400',
    previousValue: '€33.418',
    change: 23,
  },
  {
    id: 'new-customers',
    label: 'New customers',
    value: '130',
    previousValue: '92',
    change: 29,
  },
  {
    id: 'churned-customers',
    label: 'Churned customers',
    value: '5',
    previousValue: '3',
    change: 2,
    isIncreasePositive: false,
  },
  {
    id: 'active-users',
    label: 'Active users',
    value: '1337',
    previousValue: '1199',
    change: 10,
  },
]

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



import { subDays } from 'date-fns'

const activity: ActivityData[] = [
  {
    contact: {
      name: 'Helmut Magomedov',
      avatar: 'https://i.pravatar.cc/100?u=helmut',
    },
    action: 'signed up',
    date: new Date().toString(),
  },
  {
    contact: {
      name: 'Dariusz Thomas',
      avatar: 'https://i.pravatar.cc/100?u=dariusz',
    },
    action: 'signed up',
    date: subDays(new Date(), 1).toString(),
  },
  {
    contact: {
      name: 'Christian Amadi',
      avatar: 'https://i.pravatar.cc/100?u=christian',
    },
    action: 'upgraded to Pro',
    date: subDays(new Date(), 1).toString(),
  },
  {
    contact: {
      name: 'Kanchana Nowak',
      avatar: 'https://i.pravatar.cc/100?u=kanchana',
    },
    action: 'signed up',
    date: subDays(new Date(), 1).toString(),
  },
  {
    contact: {
      name: 'Aisha Njuguna',
      avatar: 'https://i.pravatar.cc/100?u=aisha',
    },
    action: 'cancelled subscription',
    date: subDays(new Date(), 2).toString(),
  },
  {
    contact: {
      name: 'Tomiko Njeri',
      avatar: 'https://i.pravatar.cc/100?u=tomiko',
    },
    action: 'signed up',
    date: subDays(new Date(), 2).toString(),
  },
  {
    contact: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/100?u=john',
    },
    action: 'upgraded to Pro',
    date: subDays(new Date(), 3).toString(),
  },
]

export interface ActivityData {
  contact: {
    name: string
    avatar?: string
  }
  action: string
  date: string
}
