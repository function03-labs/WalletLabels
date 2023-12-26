import { eachDayOfInterval, format } from 'date-fns'
import { getOrganization } from './organizations'

export interface GetDashboardVariables {
  workspace: string
  startDate: string
  endDate: string
}

export const getDashboard = async (variables: GetDashboardVariables) => {
  const { workspace, startDate, endDate } = variables

  return {
    organization: (await getOrganization({ slug: workspace })).organization,
    charts: metrics.map((metric) => {
      return {
        ...metric,
        data: createData({
          startDate,
          endDate,
        }),
      }
    }),
    sales,
    activity,
  }
}

const revenueData = [
  {
    Day: 1,
    value: 1093.12,
  },
  {
    Day: 2,
    value: 1170.7,
  },
  {
    Day: 3,
    value: 1243.51,
  },
  {
    Day: 4,
    value: 1247.7,
  },
  {
    Day: 5,
    value: 1357.47,
  },
  {
    Day: 6,
    value: 1383.67,
  },
  {
    Day: 7,
    value: 1393.69,
  },
  {
    Day: 8,
    value: 1465.58,
  },
  {
    Day: 9,
    value: 1599.79,
  },
  {
    Day: 10,
    value: 1687.44,
  },
  {
    Day: 11,
    value: 1779.2,
  },
  {
    Day: 12,
    value: 1917.7,
  },
  {
    Day: 13,
    value: 1855.43,
  },
  {
    Day: 14,
    value: 2059.69,
  },
  {
    Day: 15,
    value: 2237.25,
  },
  {
    Day: 16,
    value: 2226.94,
  },
  {
    Day: 17,
    value: 2272.42,
  },
  {
    Day: 18,
    value: 2392.75,
  },
  {
    Day: 19,
    value: 2673.55,
  },
  {
    Day: 20,
    value: 2633.16,
  },
  {
    Day: 21,
    value: 2973.53,
  },
  {
    Day: 22,
    value: 3106.51,
  },
  {
    Day: 23,
    value: 3238.85,
  },
  {
    Day: 24,
    value: 3269.85,
  },
  {
    Day: 25,
    value: 3633.04,
  },
  {
    Day: 26,
    value: 3752.32,
  },
  {
    Day: 27,
    value: 3752.53,
  },
  {
    Day: 28,
    value: 3947.62,
  },
  {
    Day: 29,
    value: 4400.6,
  },
  {
    Day: 30,
    value: 4478.47,
  },
]

const createData = ({
  startDate,
  endDate,
}: {
  startDate: string
  endDate: string
}) => {
  const days = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  })

  const growthRate = 1.02

  const values = []

  for (let i = 0; i < days.length; i++) {
    const dailyGrowth = Math.random() * 0.3 + 0.7

    const value = 2000 * Math.pow(growthRate, i) * dailyGrowth

    values.push({
      timestamp: days[i].getTime(),
      value: value,
    })
  }

  return values
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

const sales = [
  {
    id: 'us',
    country: 'US',
    sales: Math.floor(Math.random() * 500),
    total: Math.floor(Math.random() * 50000),
  },
  {
    id: 'in',
    country: 'India',
    sales: Math.floor(Math.random() * 400),
    total: Math.floor(Math.random() * 40000),
  },
  {
    id: 'br',
    country: 'Brazil',
    sales: Math.floor(Math.random() * 300),
    total: Math.floor(Math.random() * 30000),
  },
  {
    id: 'nl',
    country: 'Netherlands',
    sales: Math.floor(Math.random() * 250),
    total: Math.floor(Math.random() * 25000),
  },
  {
    id: 'de',
    country: 'Germany',
    sales: Math.floor(Math.random() * 200),
    total: Math.floor(Math.random() * 20000),
  },
  {
    id: 'fr',
    country: 'France',
    sales: Math.floor(Math.random() * 100),
    total: Math.floor(Math.random() * 10000),
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    sales: Math.floor(Math.random() * 100),
    total: Math.floor(Math.random() * 10000),
  },
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
