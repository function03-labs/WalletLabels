import { DateTime, RelativeTime } from '@common/i18n'
import { Text, Tooltip } from '@chakra-ui/react'
import {
  PersonaAvatar,
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
        {data.map(({ contact, action, date }, i) => (
          <TimelineItem key={i}>
            <TimelineSeparator>
              {i > 0 && <TimelineTrack />}
              <TimelineIcon>
                <PersonaAvatar
                  src={contact.avatar}
                  size="2xs"
                  name={contact.name}
                />
              </TimelineIcon>
              {i < data.length - 1 && <TimelineTrack />}
            </TimelineSeparator>
            <TimelineContent color="muted">
              <Text as="span" fontWeight="medium" color="chakra-body-text">
                {contact.name}
              </Text>{' '}
              <span>{action}</span> <span>·</span>{' '}
              <ActivityDate date={new Date(date)} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </MetricsCard>
  )
}
