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

  return days.map((date) => {
    const dayOfWeek = format(date, 'EEEE')
    const isWeekend = dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
    const value = isWeekend
      ? Math.floor(Math.random() * 1000)
      : Math.min(Math.random() * 8000, Math.floor(Math.random() * 10000))

    return {
      timestamp: date.getTime(),
      value: value,
    }
  })
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
    id: 'gb',
    country: 'United Kingdom',
    sales: Math.floor(Math.random() * 100),
    total: Math.floor(Math.random() * 10000),
  },
]

import { subDays } from 'date-fns'

const activity = [
  {
    name: 'Helmut Magomedov',
    action: 'signed up',
    date: new Date().toString(),
  },
  {
    name: 'Dariusz Thomas',
    action: 'signed up',
    date: subDays(new Date(), 1).toString(),
  },
  {
    name: 'Christian Amadi',
    action: 'upgraded to Pro',
    date: subDays(new Date(), 1).toString(),
  },
  {
    name: 'Kanchana Nowak',
    action: 'signed up',
    date: subDays(new Date(), 1).toString(),
  },
  {
    name: 'Aisha Njuguna',
    action: 'cancelled subscription',
    date: subDays(new Date(), 2).toString(),
  },
  {
    name: 'Tomiko Njeri',
    action: 'signed up',
    date: subDays(new Date(), 2).toString(),
  },
  {
    name: 'John Doe',
    action: 'upgraded to Pro',
    date: subDays(new Date(), 3).toString(),
  },
  {
    name: 'Jane Smith',
    action: 'cancelled subscription',
    date: subDays(new Date(), 4).toString(),
  },
  {
    name: 'Bob Johnson',
    action: 'signed up',
    date: subDays(new Date(), 5).toString(),
  },
  {
    name: 'Alice Lee',
    action: 'upgraded to Pro',
    date: subDays(new Date(), 6).toString(),
  },
]

export interface ActivityData {
  name: string
  action: string
  date: string
}
