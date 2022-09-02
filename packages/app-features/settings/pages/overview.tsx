import { SimpleGrid } from '@chakra-ui/react'
import { PersonaAvatar, PropertyList, Property } from '@saas-ui/react'
import { Section } from '@saas-ui/pro'
import { useBilling } from '@saas-ui/billing'

import {
  FiHelpCircle,
  FiBox,
  FiGithub,
  FiShield,
  FiBriefcase,
} from 'react-icons/fi'

import { SettingsPage } from '@app/features/core/components/settings-page'
import { SettingsCard } from '@app/features/settings/components/settings-card'
import { SupportCard } from '@app/features/settings/components/support-card'

import { Button } from '@app/features/core/components/button'
import { usePath } from '@app/features/core/hooks/use-path'

import { FormattedDate } from '@app/i18n'

import { useGetOrganizationQuery } from '@app/graphql'

export function SettingsOverviewPage() {
  const { data, isLoading } = useGetOrganizationQuery()

  const { currentPlan, isTrialing, isCanceled, trialEndsAt, status } =
    useBilling()

  return (
    <SettingsPage
      title="Overview"
      description="Manage your organization settings"
      isLoading={isLoading}
    >
      <Section title="Organization settings">
        <SimpleGrid columns={[1, null, 2]} spacing={4}>
          <SettingsCard
            title="Billing"
            subtitle="Manage your subscription."
            icon={FiBriefcase}
            footer={
              <Button
                href={usePath('/settings/plans')}
                variant="subtle"
                colorScheme="green"
              >
                {isCanceled ? 'Activate your account' : 'Upgrade'}
              </Button>
            }
          >
            <PropertyList borderTopWidth="1px" px="4">
              <Property label="Billing plan" value={currentPlan?.name} />
              {isTrialing ? (
                <Property
                  label="Trial ends"
                  value={<FormattedDate value={trialEndsAt} />}
                />
              ) : (
                <Property label="Status" value={status} />
              )}
            </PropertyList>
          </SettingsCard>
          <SettingsCard
            title="Organization"
            subtitle="Manage your organization details."
            avatar={<PersonaAvatar name={data?.organization?.name} size="sm" />}
            footer={
              <Button href={usePath('/settings/organization')} variant="subtle">
                Update
              </Button>
            }
          >
            <PropertyList borderTopWidth="1px" px="4">
              <Property label="Name" value={data?.organization?.name} />
              <Property label="Email" value="hello@saas-ui.dev" />
            </PropertyList>
          </SettingsCard>
        </SimpleGrid>
      </Section>

      <Section title="Your account">
        <SimpleGrid columns={[1, null, 2]} spacing={4}>
          <SettingsCard
            title="Security recommendations"
            subtitle="Improve your account security by enabling two-factor
              authentication."
            icon={FiShield}
            footer={
              <Button
                label="Enable two-factor authentication"
                variant="subtle"
                colorScheme="primary"
              />
            }
          />
        </SimpleGrid>
      </Section>

      <Section title="More">
        <SimpleGrid columns={[1, null, 3]} spacing={4}>
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
