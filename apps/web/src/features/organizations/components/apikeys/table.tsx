import {
  SearchInput,
  DataTable,
  EmptyState,
  StructuredList,
  OverflowMenu,
  PersonaAvatar,
  StructuredListCell,
  StructuredListIcon,
  StructuredListItem,
  FormDialog,
  FormLayout,
  Field,
} from '@saas-ui/react'

import { Search2Icon } from '@chakra-ui/icons'
import { FiCircle, FiClipboard } from 'react-icons/fi'

import { ActivityData } from '@api/client'
import { useRef, useState } from 'react'

import React from 'react'
import { MetricsCard } from '../metrics/metrics-card'
import {
  Card,
  CardHeader,
  Button,
  Text,
  Box,
  HStack,
  Heading,
  Tag,
  useDisclosure,
  AvatarGroup,
  Avatar,
} from '@chakra-ui/react'

export const DataAPI = ({ data }: { data: ActivityData[] }) => {
  const apiDialog = useDisclosure()
  const onSubmit = async (data) => {
    apiDialog.onClose()
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'User',
        accessor: 'user',
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
      {
        Header: 'Resource',
        accessor: 'resource',
      },
    ],
    [],
  )
  const dataTable = React.useMemo(
    () => [
      {
        date: '2021-08-01',
        user: 'John Doe',
        action: 'Created',
        resource: 'API Key',
      },
      {
        date: '2021-08-01',
        user: 'John Doe',
        action: 'Created',
        resource: 'API Key',
      },
    ],
    [],
  )

  const results = [
    {
      id: 1,
      name: 'API Key 1',
      key: '1234567890abcdef',
      dateCreated: '2022-01-01',
    },
    {
      id: 2,
      name: 'API Key 2',
      key: 'abcdef1234567890',
      dateCreated: '2022-01-02',
    },
    {
      id: 3,
      name: 'API Key 3',
      key: 'fedcba0987654321',
      dateCreated: '2022-01-03',
    },
    // Add more API keys as needed
  ]

  return (
    <Card>
      <CardHeader
        display="flex"
        //   justify content="space-between"
        // SACE BETWEEN CHAKRA
        justifyContent="space-between"
        px="4"
      >
        {/* Add title of table API Keys */}
        <Text
          size={'md'}
          fontWeight={'bold'}
          color={'text'}
          lineHeight={'short'}
        >
          API Keys
        </Text>
        {/* Add search input */}
        <Button
          onClick={apiDialog.onOpen}
          colorScheme="dark"
          variant="outline"
          flexShrink="0"
        >
          Generate
        </Button>
      </CardHeader>
      {results?.length ? (
        <StructuredList py="0">
          {results.map((apikey, i) => (
            <APIListItem<M> key={i} member={apikey} />
          ))}
        </StructuredList>
      ) : (
        <EmptyState title={'No API Keys found'} size="sm" p="4" />
      )}
      <ApiCreateDialog apiProps={apiDialog} onSubmit={onSubmit} />
    </Card>
  )
}

const APIListItem = ({ member }: { member: any }) => {
  return (
    <StructuredListItem
      py="4"
      borderBottomWidth="1px"
      sx={{ '&:last-of-type': { borderWidth: 0 } }}
      className="flex justify-between"
    >
      <StructuredListCell px="4">
        <Text size="sm">{'member.name' || 'member.email'}</Text>
      </StructuredListCell>
      {/* Add Structure Cell to display chains stacked avatar */}
      <StructuredListCell>
        <AvatarGroup size="xs" max={4}>
          <Avatar
            name="ethereum"
            src="https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg"
          />
          <Avatar
            name="solana"
            src="https://icons.llamao.fi/icons/chains/rsz_solana.jpg"
          />
          <Avatar
            name="polygon"
            src="https://icons.llamao.fi/icons/chains/rsz_polygon.jpg"
          />
          <Avatar
            name="optimism"
            src="https://icons.llamao.fi/icons/chains/rsz_optimism.jpg"
          />
          <Avatar
            name="arbitrum"
            src="https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg"
          />
          <Avatar
            name="avalanche"
            src="https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg"
          />
        </AvatarGroup>
      </StructuredListCell>
      <StructuredListCell>
        <div className="flex items-center justify-between border-opacity-45 text-gray-800 border border-gray-300 dark:text-gray-300 dark:border-gray-400 max-w-sm font-mono text-sm py-2 px-2 w-[250px] rounded-md">
          <div className="flex gap-1">
            <span>npm run dev</span>
          </div>
          <span className="flex items-center self-center text-gray-800 cursor-pointer w-5 h-5 hover:text-gray-400 duration-200">
            <FiClipboard />
          </span>
        </div>
      </StructuredListCell>
    </StructuredListItem>
  )
}

const ApiCreateDialog = ({ apiProps, onSubmit }: any) => {
  const initialRef = useRef()

  return (
    <FormDialog
      title="Generate an API Key"
      {...apiProps}
      defaultValues={{
        title: '',
        description: '',
      }}
      onSubmit={apiProps.onSubmit}
    >
      <FormLayout>
        <Field
          name="title"
          label="API Name"
          rules={{ required: 'API Name is required' }}
          placeholder="Enter a name for the API Key"
        />
        <Field
          name="Select A Chain"
          label="Chain"
          type="select"
          defaultValue="All Chains"
          renderValue={(value) => {
            const chains = [
              'ethereum',
              'solana',
              'polygon',
              'optimism',
              'arbitrum',
              'avalanche',
              'fantom',
              'near',
              'celo',
            ]
            const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_`
            if (value == '') return null
            return (
              <div className="flex gap-2 items-center ">
                <AvatarGroup max={4} size={'xs'}>
                  {chains.map((chain) => (
                    <Avatar
                      key={chain}
                      name={chain}
                      src={iconUrl + chain + '.jpg'}
                      size="xs"
                    />
                  ))}
                </AvatarGroup>
                All Chains
              </div>
            )
          }}
          // add icon the chain   con}

          options={[
            {
              value: 'All Chains',
              label: 'All Chains',
            },
          ]}
          // ref={initialRef}
        />
        {/* <Field name="description" type="textarea" label="Description" /> */}
      </FormLayout>
    </FormDialog>
  )
}
