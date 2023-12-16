import { SimpleGrid } from '@chakra-ui/react'
import { IntegrationCard, IntegrationCardProps } from './integration-card'
import { FaGithub, FaX } from 'react-icons/fa6'

const integrations: IntegrationCardProps[] = [
  {
    name: 'GitHub',
    type: 'Free integration',
    description:
      'Track activity like pushes, issues, and pull requests from a GitHub repository.',
    icon: FaGithub,
    docs: '#',
  },
  {
    name: 'X',
    type: 'Free integration',
    description:
      'Follow activity like mentions, hashtags, and retweets from specific accounts.',
    icon: FaX,
    docs: '#',
    isConnected: true,
  },
]

export const Integrations = () => {
  return (
    <SimpleGrid columns={2} spacing="4">
      {integrations.map((integration) => (
        <IntegrationCard key={integration.name} {...integration} />
      ))}
    </SimpleGrid>
  )
}
