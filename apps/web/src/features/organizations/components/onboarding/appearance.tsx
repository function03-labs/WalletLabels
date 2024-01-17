import { useRef } from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Img,
  Stack,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { UseFormReturn, useSnackbar, useStepperContext } from '@saas-ui/react'
import * as z from 'zod'

import { OnboardingStep } from './onboarding-step'
import { useMutation } from '@tanstack/react-query'
import { subscribeToNewsletter } from '@api/client'
import { useSessionStorageValue } from '@react-hookz/web'
import { LinkButton } from '@ui/lib'

const schema = z.object({})

type FormInput = z.infer<typeof schema>

export const AppearanceStep = () => {
  const stepper = useStepperContext()
  const colorMode = useColorMode()

  return (
    <OnboardingStep
      schema={schema}
      title="Choose your style"
      description="You can change the color mode at any time in your profile settings."
      defaultValues={{}}
      onSubmit={async () => {
        stepper.nextStep()
      }}
      submitLabel="Continue"
    >
      <Flex m="-6">
        <Stack
          flex="1"
          p="8"
          aria-role="button"
          aria-label="Enable light mode"
          cursor="pointer"
          _hover={{ bg: 'blackAlpha.50' }}
          _dark={{ _hover: { bg: 'whiteAlpha.50' } }}
          onClick={() => colorMode.setColorMode('light')}
        >
          <AspectRatio
            ratio={16 / 9}
            height="100px"
            borderRadius="md"
            overflow="hidden"
            borderWidth="1px"
            bg="gray.50"
            data-selected={colorMode.colorMode === 'light' ? '' : undefined}
            _selected={{
              borderColor: 'primary.500',
              shadow: 'outline',
            }}
          >
            <Img src="/img/onboarding/light.svg" alt="Light dashboard" />
          </AspectRatio>
          <Text>Light</Text>
        </Stack>
        <Stack
          flex="1"
          p="8"
          aria-role="button"
          aria-label="Enable dark mode"
          cursor="pointer"
          _hover={{ bg: 'blackAlpha.50' }}
          _dark={{ _hover: { bg: 'whiteAlpha.50' } }}
          onClick={() => colorMode.setColorMode('dark')}
        >
          <AspectRatio
            ratio={16 / 9}
            height="100px"
            borderRadius="md"
            overflow="hidden"
            borderWidth="1px"
            bg="gray.800"
            data-selected={colorMode.colorMode === 'dark' ? '' : undefined}
            _selected={{
              borderColor: 'primary.500',
              shadow: 'outline',
            }}
          >
            <Img src="/img/onboarding/dark.svg" alt="Dark dashboard" />
          </AspectRatio>
          <Text>Dark</Text>
        </Stack>
      </Flex>
    </OnboardingStep>
  )
}
