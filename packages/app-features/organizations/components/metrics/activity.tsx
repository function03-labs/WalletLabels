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
import { ActivityData } from '@api/client'

const ActivityDate: React.FC<{ date: Date }> = (props) => {
  return (
    <Tooltip label={<DateTime date={props.date} />}>
      <Text as="span" color="muted">
        <RelativeTime date={props.date} />
      </Text>
    </Tooltip>
  )
}

export const Activity = ({ data }: { data: ActivityData[] }) => {
  return (
    <MetricsCard title="Activity">
      <Timeline variant="outline">
        {data.map(({ name, action, date }, i) => (
          <TimelineItem key={i}>
            <TimelineSeparator>
              <TimelineIcon />
              {i < data.length - 1 && <TimelineTrack />}
            </TimelineSeparator>
            <TimelineContent>
              <strong>{name}</strong> <span>{action}</span>.{' '}
              <ActivityDate date={new Date(date)} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </MetricsCard>
  )
}
