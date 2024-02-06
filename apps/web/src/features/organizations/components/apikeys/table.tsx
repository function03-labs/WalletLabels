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

interface ApiKey {
  id: number;
  name: string;
  key: string;
  dateCreated: string;
}
interface APIListItemProps {
  apiKey: ApiKey;
}



export const DataAPI = ({ data }: { data: ActivityData[] }) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const apiDialog = useDisclosure()

  const generateApiKey = async (name: string) => {
    try {
      const response = await fetch('/api/apiKeys/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        console.error('Failed to generate API key. Status:', response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const newKey: ApiKey = {
        id: data.apiKeyDetails.id,
        name: data.apiKeyDetails.name,
        key: data.apiKeyDetails.value,
        dateCreated: data.apiKeyDetails.createdDate, 
      };

      setApiKeys((prevKeys) => [...prevKeys, newKey]);
      console.log(newKey)
      return newKey; 
    } catch (error) {
      console.error('Error generating API key:', error);
      //TODO: Handle UI when Generation Fails
      throw error; 
    }
  };
  const onSubmit = async (data) => {
    const apiKey= await generateApiKey(data.name);
    apiDialog.onClose()
  }
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
      {
      apiKeys.length > 0 ? (

        <StructuredList py="0">
        {apiKeys.map((apiKey,i) => (
        <APIListItem key={i} apiKey={apiKey} />
      ))}
      </StructuredList>
      ) : (
        <Text p="4">No API Keys found</Text>
      )
      }
      <ApiCreateDialog apiProps={apiDialog} onSubmit={onSubmit} />
    </Card>
  )
}

const APIListItem: React.FC<APIListItemProps> = ({ apiKey }) => {
  console.log('API LIST',apiKey)
  return (
    <StructuredListItem
      py="4"
      borderBottomWidth="1px"
      sx={{ '&:last-of-type': { borderWidth: 0 } }}
      className="flex justify-between"
    >
      <StructuredListCell px="4">
        <Text size="sm">{apiKey.name}:{apiKey.key}</Text>
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
        name: '',
        description: '',
      }}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field
          name="name"
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
