import {
  Button,
  Card,
  CardBody,
  Container,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Field, Form } from '@saas-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import {
  BenefitsModal,
  BenefitsModalActions,
  BenefitsModalBody,
  BenefitsModalFooter,
  BenefitsModalHeader,
  BenefitsModalMedia,
  TourDialog,
  TourDialogActions,
  TourDialogBody,
  TourDialogCloseButton,
  TourDialogFooter,
  TourDialogHeader,
  TourProps,
  TourSpotlight,
} from '../src'
import { Tour, TourDismissButton, TourNextButton } from '../src/tour'
import { TourBeacon } from '../src/tour-beacon'

const meta: Meta = {
  title: 'Components/Onboarding/Tour',
  component: TourDialog,
  parameters: {
    controls: { expanded: true },
  },
  args: {},
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      )
    },
  ],
}
export default meta

const Template: Story<TourProps> = (args) => {
  const { children, ...rest } = args

  return (
    <>
      <Stack spacing="40" alignItems="center">
        <Button id="tour-1">Create</Button>
        <Form onSubmit={() => null}>
          <Field name="title" label="Title" id="tour-2" />
        </Form>
        <Card id="tour-3">
          <CardBody>Another feature</CardBody>
        </Card>
      </Stack>

      <Tour {...rest}>
        <TourDialog data-target="#tour-1">
          <TourDialogCloseButton />
          <TourDialogHeader>Check out this new feature</TourDialogHeader>
          <TourDialogBody>Start the tour to see how it works.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 1 of 3</Text>
            <TourDialogActions>
              <TourDismissButton />
              <TourNextButton>Start</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="#tour-2">
          <TourDialogCloseButton />
          <TourDialogHeader>Step 2</TourDialogHeader>
          <TourDialogBody>Tour step 2.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 2 of 3</Text>
            <TourDialogActions>
              <TourNextButton />
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="#tour-3">
          <TourDialogCloseButton />
          <TourDialogHeader>Step 3</TourDialogHeader>
          <TourDialogBody>Tour step 3.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 3 of 3</Text>
            <TourDialogActions>
              <TourNextButton>Finish</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>
        {children}
      </Tour>
    </>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  defaultIsActive: true,
}

export const WithSpotlight = Template.bind({})
WithSpotlight.args = {
  defaultIsActive: true,
  children: <TourSpotlight />,
}

export const WithCustomSpotlight = Template.bind({})
WithCustomSpotlight.args = {
  defaultIsActive: true,
  children: <TourSpotlight borderWidth="0" spacing={8} />,
}

export const WithBeacon = Template.bind({})
WithBeacon.args = {
  children: (
    <>
      <TourSpotlight />
      <TourBeacon />
    </>
  ),
}

export const WithModal = () => {
  return (
    <>
      <Stack spacing="40" alignItems="center">
        <Button id="tour-1">Create</Button>
        <Form onSubmit={() => null}>
          <Field name="title" label="Title" id="tour-2" />
        </Form>
        <Card id="tour-3">
          <CardBody>Another feature</CardBody>
        </Card>
      </Stack>

      <Tour defaultIsActive>
        <BenefitsModal data-target="modal" hideOverlay>
          <BenefitsModalMedia
            src="onboarding/undraw_building_blocks_re_5ahy.svg"
            mx="16"
            my="8"
          />
          <BenefitsModalHeader textAlign="center">
            Check out this new feature
          </BenefitsModalHeader>
          <BenefitsModalBody textAlign="center">
            Benefits modals can be used to highlight new features and their
            benefits in your app. Embed illustrations or videos to make ideas
            more accessible.
          </BenefitsModalBody>
          <BenefitsModalFooter>
            <BenefitsModalActions>
              <TourDismissButton />
              <TourNextButton />
            </BenefitsModalActions>
          </BenefitsModalFooter>
        </BenefitsModal>

        <TourDialog data-target="#tour-1">
          <TourDialogCloseButton />
          <TourDialogHeader>Check out this new feature</TourDialogHeader>
          <TourDialogBody>Start the tour to see how it works.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 1 of 3</Text>
            <TourDialogActions>
              <TourDismissButton />
              <TourNextButton>Start</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="#tour-2">
          <TourDialogCloseButton />
          <TourDialogHeader>Step 2</TourDialogHeader>
          <TourDialogBody>Tour step 2.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 2 of 3</Text>
            <TourDialogActions>
              <TourNextButton />
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="#tour-3">
          <TourDialogCloseButton />
          <TourDialogHeader>Step 3</TourDialogHeader>
          <TourDialogBody>Tour step 3.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 3 of 3</Text>
            <TourDialogActions>
              <TourNextButton>Finish</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourSpotlight />
      </Tour>
    </>
  )
}

export const WithNoCloseOnBlur = () => {
  return (
    <>
      <Stack spacing="40" alignItems="center">
        <Button id="tour-1">Create</Button>
        <Form onSubmit={() => null}>
          <Field name="title" label="Title" id="tour-2" />
        </Form>
        <Card id="tour-3">
          <CardBody>Another feature</CardBody>
        </Card>
      </Stack>

      <Tour defaultIsActive>
        <TourDialog data-target="#tour-1" closeOnBlur={false}>
          <TourDialogCloseButton />
          <TourDialogHeader>Check out this new feature</TourDialogHeader>
          <TourDialogBody>Start the tour to see how it works.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 1 of 3</Text>
            <TourDialogActions>
              <TourDismissButton />
              <TourNextButton>Start</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="#tour-2" closeOnBlur={false}>
          <TourDialogCloseButton />
          <TourDialogHeader>Step 2</TourDialogHeader>
          <TourDialogBody>Tour step 2.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 2 of 3</Text>
            <TourDialogActions>
              <TourNextButton />
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="#tour-3" closeOnBlur={false}>
          <TourDialogCloseButton />
          <TourDialogHeader>Step 3</TourDialogHeader>
          <TourDialogBody>Tour step 3.</TourDialogBody>
          <TourDialogFooter>
            <Text>Step 3 of 3</Text>
            <TourDialogActions>
              <TourNextButton>Finish</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourSpotlight closeOnClick={false} />
      </Tour>
    </>
  )
}
