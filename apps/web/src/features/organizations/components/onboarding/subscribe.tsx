import { Box, Flex, Heading, Stack, Switch, Text } from '@chakra-ui/react'
import { useSnackbar, useStepperContext } from '@saas-ui/react'
import * as z from 'zod'

import { OnboardingStep } from './onboarding-step'
import { useMutation } from '@tanstack/react-query'
import { subscribeToNewsletter } from '@api/client'
import { useSessionStorageValue } from '@react-hookz/web'
import { LinkButton } from '@ui/lib'

const schema = z.object({
  newsletter: z.boolean(),
})

type FormInput = z.infer<typeof schema>

export const SubscribeStep = () => {
  const stepper = useStepperContext()
  const snackbar = useSnackbar()

  const workspace = useSessionStorageValue<string>('getting-started.workspace')

  const { mutateAsync } = useMutation({
    mutationFn: subscribeToNewsletter,
  })

  return (
    <OnboardingStep<FormInput>
      schema={schema}
      title="Subscribe to updates"
      description="Saas UI is updated regularly. These are the best ways to stay up to date."
      defaultValues={{ newsletter: false }}
      onSubmit={async (data) => {
        if (data.newsletter) {
          try {
            await mutateAsync({
              workspace: workspace.value!,
              newsletter: data.newsletter,
            })
          } catch {
            snackbar.error('Could not subscribe you to our newsletter.')
          }
        }

        stepper.nextStep()
      }}
      submitLabel="Continue"
    >
      <Box m="-6">
        <Flex borderBottomWidth="1px" p="6" display="flex" alignItems="center">
          <Stack flex="1" alignItems="flex-start" spacing="0.5">
            <Heading size="sm">Subscribe to our monthly newsletter</Heading>
            <Text color="muted">
              Receive monthly updates in your email inbox.
            </Text>
          </Stack>
          <Switch />
        </Flex>
        <Flex borderBottomWidth="1px" p="6" display="flex" alignItems="center">
          <Stack flex="1" alignItems="flex-start" spacing="0.5">
            <Heading size="sm">Follow us on X</Heading>
            <Text color="muted">Regular posts with updates and tips.</Text>
          </Stack>
          <LinkButton href="https://x.com/saas_js" target="_blank">
            @saas_js
          </LinkButton>
        </Flex>
        <Flex p="6" display="flex" alignItems="center">
          <Stack flex="1" alignItems="flex-start" spacing="0.5">
            <Heading size="sm">Join our Discord community</Heading>
            <Text color="muted">Chat with other developers and founders.</Text>
          </Stack>
          <LinkButton href="https://saas-ui.dev/discord">
            Join Discord
          </LinkButton>
        </Flex>
      </Box>
    </OnboardingStep>
  )
}
