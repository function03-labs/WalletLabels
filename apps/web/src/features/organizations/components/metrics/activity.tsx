import { DateTime, RelativeTime } from '@common/i18n'
import {
  Badge,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tag,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import {
  PersonaAvatar,
  SearchInput,
  Timeline,
  TimelineContent,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
  TimelineTrack,
} from '@saas-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { FiCircle } from 'react-icons/fi'

import { MetricsCard } from './metrics-card'
import { ActivityData } from '@api/client'
import { useState } from 'react'
import {
  FiltersProvider,
  Page,
  PageHeader,
  Toolbar,
  FiltersAddButton,
  ActiveFiltersList,
  PageBody,
} from '@saas-ui-pro/react'
import React from 'react'

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
  const filters = React.useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        icon: <FiCircle />,
        type: 'enum',
        items: [
          {
            id: 'new',
            label: 'New',
            icon: (
              <Badge boxSize="8px" mx="2px" borderRadius="full" bg="blue.400" />
            ),
          },
          {
            id: 'active',
            label: 'Active',
            icon: (
              <Badge
                boxSize="8px"
                mx="2px"
                borderRadius="full"
                bg="green.400"
              />
            ),
          },
        ],
      },
    ],
    [],
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [tags, setTags] = useState([])
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    // This is a pseudo-function. You should implement the actual search logic based on your backend.
    const fetchedResults = await fetchWalletLabels(searchQuery, tags)
    setResults(fetchedResults)
  }

  const handleTagClick = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  return (
    <MetricsCard title="Quick Search">
      <SearchInput placeholder="Search" />
      <FiltersProvider filters={filters}>
        <Toolbar
          variant="ghost"
          style={{
            alignContent: 'left',
            justifyContent: 'left',
            marginTop: '0.6rem',
          }}
          variant={'outline'}
        >
          <FiltersAddButton />
        </Toolbar>{' '}
        <ActiveFiltersList />
      </FiltersProvider>
    </MetricsCard>
  )
}
