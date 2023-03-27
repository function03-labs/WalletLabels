import { DateTime, RelativeTime } from '@app/i18n'
import { Text, Tooltip } from '@chakra-ui/react'
import {
  Timeline,
  TimelineContent,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
  TimelineTrack,
} from '@saas-ui/react'
import { MetricsCard } from './metrics-card'

import { subDays } from 'date-fns'

const activites = [
  {
    name: 'Helmut Magomedov',
    action: 'signed up',
    date: new Date(),
  },
  {
    name: 'Dariusz Thomas',
    action: 'signed up',
    date: subDays(new Date(), 1),
  },
  {
    name: 'Christian Amadi',
    action: 'upgraded to Pro',
    date: subDays(new Date(), 1),
  },
  {
    name: 'Kanchana Nowak',
    action: 'signed up',
    date: subDays(new Date(), 1),
  },
  {
    name: 'Aisha Njuguna',
    action: 'cancelled subscription',
    date: subDays(new Date(), 2),
  },
  {
    name: 'Tomiko Njeri',
    action: 'signed up',
    date: subDays(new Date(), 2),
  },
]

const ActivityDate: React.FC<{ date: Date }> = (props) => {
  return (
    <Tooltip label={<DateTime date={props.date} />}>
      <Text as="span" color="muted">
        <RelativeTime date={props.date} />
      </Text>
    </Tooltip>
  )
}

export const Activity = () => {
  return (
    <MetricsCard title="Activity">
      <Timeline variant="outline">
        {activites.map(({ name, action, date }, i) => (
          <TimelineItem key={i}>
            <TimelineSeparator>
              <TimelineIcon />
              {i < activites.length - 1 && <TimelineTrack />}
            </TimelineSeparator>
            <TimelineContent>
              <strong>{name}</strong> <span>{action}</span>.{' '}
              <ActivityDate date={date} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </MetricsCard>
  )
}
