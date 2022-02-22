import { SimpleGrid } from '@chakra-ui/react'
import { Button, PersonaAvatar, List, Property } from '@saas-ui/react'
import { Section } from '@saas-ui/pro'

import { SettingsPage } from '@modules/core/components/settings-page'

import { SettingsCard } from '@modules/settings/components/settings-card'
import { SupportCard } from '@modules/settings/components/support-card'

import {
  FiHelpCircle,
  FiBox,
  FiGithub,
  FiShield,
  FiBriefcase,
} from 'react-icons/fi'

import { useGetOrganizationQuery } from '@app/graphql'

export function SettingsOverviewPage() {
  const { data, isLoading } = useGetOrganizationQuery()

  return (
    <SettingsPage
      title="Overview"
      description="Manage your organization settings"
      isLoading={isLoading}
    >
      <Section title="Organization settings">
        <SimpleGrid columns={2} spacing={4}>
          <SettingsCard
            title="Billing"
            subtitle="Your trial ends in 30 days."
            icon={FiBriefcase}
            footer={
              <Button variant="subtle" colorScheme="green">
                Upgrade
              </Button>
            }
          >
            <List borderTopWidth="1px" px="4">
              <Property label="Billing plan" value="Professional" />
              <Property label="Trial ends" value="28-09-2022" />
            </List>
          </SettingsCard>
          <SettingsCard
            title="Organization"
            subtitle="Manage your organization details."
            avatar={<PersonaAvatar name={data?.organization?.name} size="sm" />}
            footer={<Button>Update</Button>}
          >
            <List borderTopWidth="1px" px="4">
              <Property label="Name" value={data?.organization?.name} />
              <Property label="Email" value="hello@saas-ui.dev" />
            </List>
          </SettingsCard>
        </SimpleGrid>
      </Section>

      <Section title="Your account">
        <SimpleGrid columns={2} spacing={4}>
          <SettingsCard
            title="Security recommendations"
            subtitle="Improve your account security by enabling two-factor
              authentication."
            icon={FiShield}
            footer={
              <Button
                label="Enable two-factor authentication"
                colorScheme="primary"
              />
            }
          />
        </SimpleGrid>
      </Section>

      <Section title="More">
        <SimpleGrid columns={3} spacing={4}>
          <SupportCard
            title="Start guide"
            subtitle="Read how to get started with Saas UI."
            icon={FiHelpCircle}
            href="https://saas-ui.dev/docs/getting-started"
          />
          <SupportCard
            title="Components"
            subtitle="See all components and how they work."
            icon={FiBox}
            href="https://www.saas-ui.dev/docs/auth/auth-provider"
          />
          <SupportCard
            title="Feedback"
            subtitle="Post feedback, bug reports and feature requests."
            icon={FiGithub}
            href="https://github.com/saas-js/saas-ui/issues"
          />
        </SimpleGrid>
      </Section>
    </SettingsPage>
  )
}
