import { Badge, Spacer, Text } from '@chakra-ui/react'
import {
  Timeline,
  TimelineProps,
  TimelineItem,
  TimelineSeparator,
  TimelineIcon,
  TimelineTrack,
  TimelineContent,
  Toolbar,
  ToolbarButton,
} from '@saas-ui/pro'
import {
  Card,
  Field,
  Form,
  FormLayout,
  Link,
  PersonaAvatar,
  SubmitButton,
  useCurrentUser,
  User,
} from '@saas-ui/react'
import { FiPaperclip } from 'react-icons/fi'

interface Activity {
  user: Pick<User, 'id' | 'name' | 'avatar'>
  type: string
  date: Date
}

const activies: Activity[] = [
  {
    user: {
      id: '1',
      name: 'Renata',
      avatar: 'https://www.saas-ui.dev/showcase-avatar.jpg',
    },
    type: 'created-contact',
    date: new Date(),
  },
]

export interface ActivityTimelineProps {
  activities: Activity[]
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = (props) => {
  const user = useCurrentUser()
  return (
    <Timeline>
      <TimelineItem minH="38px">
        <TimelineSeparator>
          <TimelineIcon mt="-2px">
            <PersonaAvatar
              src="https://www.saas-ui.dev/showcase-avatar.jpg"
              colorScheme="purple.300"
              name="Renata Alink"
              size="2xs"
              bg="purple.200"
              presence="online"
            />
          </TimelineIcon>
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>
          <Text color="muted">
            <Link href="#" color="black" _dark={{ color: 'white' }}>
              Renata
            </Link>{' '}
            created the contact.
          </Text>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem minH="38px">
        <TimelineSeparator>
          <TimelineIcon>
            <Badge
              rounded="full"
              borderWidth="2px"
              borderColor="green.400"
              bg="none"
              boxSize="13px"
            />
          </TimelineIcon>
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>
          <Text color="muted">John changed status to active.</Text>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem minH="38px">
        <TimelineSeparator>
          <TimelineIcon mt="-2px">
            <PersonaAvatar
              src="https://www.saas-ui.dev/showcase-avatar.jpg"
              name="Renata Alink"
              size="2xs"
              bg="purple.200"
              presence="online"
            />
          </TimelineIcon>
        </TimelineSeparator>
        <TimelineContent color="muted">
          <Text as="span">
            <Link href="#" color="black" _dark={{ color: 'white' }}>
              Renata
            </Link>{' '}
            completed the issue.
          </Text>{' '}
          <Text as="span">14 days ago</Text>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem minH="38px">
        <TimelineSeparator>
          <TimelineIcon mt="-6px">
            <PersonaAvatar src={user?.avatar} name={user?.name} size="sm" />
          </TimelineIcon>
        </TimelineSeparator>
        <TimelineContent color="muted">
          <Card>
            <Form onSubmit={() => null} px="2" py="3">
              <FormLayout>
                <Field
                  name="comment"
                  type="textarea"
                  border="0"
                  _focus={{ border: 0, outline: 0, boxShadow: 'none' }}
                  resize="none"
                />
                <Toolbar>
                  <ToolbarButton
                    icon={<FiPaperclip />}
                    color="muted"
                    aria-label="Attach file"
                  />
                  <Spacer />
                  <SubmitButton />
                </Toolbar>
              </FormLayout>
            </Form>
          </Card>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
