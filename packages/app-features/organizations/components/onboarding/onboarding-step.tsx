import {
  Card,
  CardBody,
  Flex,
  Heading,
  keyframes,
  Text,
} from '@chakra-ui/react'
import {
  FieldValues,
  SubmitButton,
  SubmitHandler,
  UseFormReturn,
  DeepPartial,
  WatchObserver,
} from '@saas-ui/react'

import * as z from 'zod'

import { Form } from '@ui/lib'

export interface OnboardingStepProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  title: string
  description: string
  schema: z.ZodObject<any, any, any>
  defaultValues: DeepPartial<TFieldValues>
  onChange?: WatchObserver<TFieldValues>
  onSubmit: SubmitHandler<TFieldValues>
  submitLabel: string
  children: React.ReactNode
  formRef?: React.RefObject<UseFormReturn<TFieldValues>>
}

const fade = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0px, -10px, 0px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`

const animation = (delay = 0) =>
  `.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s 1 normal both running ${fade}`

export const OnboardingStep = <TFieldValues extends FieldValues = FieldValues>(
  props: OnboardingStepProps<TFieldValues>,
) => {
  const {
    title,
    description,
    schema,
    defaultValues,
    onChange,
    onSubmit,
    submitLabel,
    formRef,
    children,
  } = props
  return (
    <Flex flexDirection="column" alignItems="center" textAlign="center" mb="20">
      <Heading animation={animation(0)} size="lg" mb="6">
        {title}
      </Heading>
      <Text color="muted" fontSize="lg" animation={animation(0.1)} mb="8">
        {description}
      </Text>

      <Form
        schema={schema}
        formRef={formRef}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onChange={onChange}
        alignSelf="stretch"
      >
        <Card mb="6" animation={animation(0.2)}>
          <CardBody p="6">{children}</CardBody>
        </Card>

        <SubmitButton
          size="md"
          width="80%"
          margin="0 10%"
          animation={animation(0.3)}
        >
          {submitLabel}
        </SubmitButton>
      </Form>
    </Flex>
  )
}
