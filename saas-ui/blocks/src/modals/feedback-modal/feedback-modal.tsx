import {
  Button,
  HStack,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Textarea,
  forwardRef,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@saas-ui-pro/react'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadOptions,
  FileUploadTrigger,
} from '@saas-ui/file-upload'
import {
  Controller,
  Form,
  FormLayout,
  Link,
  SubmitButton,
  SubmitHandler,
  createField,
  useSnackbar,
} from '@saas-ui/react'

import * as React from 'react'
import {
  LuAlertTriangle,
  LuCross,
  LuHelpCircle,
  LuMessageCircle,
  LuPaperclip,
  LuX,
} from 'react-icons/lu'

interface FeedbackInput {
  type: 'problem' | 'question' | 'feedback'
  comment: string
  files: File[]
}

export interface FeedbackModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: SubmitHandler<FeedbackInput>
}

export const FeedbackModal: React.FC<FeedbackModalProps> = (props) => {
  const { onSubmit, ...rest } = props

  const defaultValues: FeedbackInput = {
    type: 'feedback',
    comment: '',
    files: [],
  }

  return (
    <Modal size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          {({ control }) => (
            <>
              <ModalHeader borderBottomWidth="1px">
                <Heading as="h3" fontSize="lg" fontWeight="medium" mb="1">
                  Feedback
                </Heading>
                <Text color="muted" fontSize="sm" fontWeight="normal">
                  Got feedback? Share your feature requests and why they're
                  important.
                </Text>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody>
                <FormLayout>
                  <ToggleButtonField
                    name="type"
                    items={[
                      {
                        value: 'problem',
                        label: 'Problem',
                        icon: <LuAlertTriangle />,
                      },
                      {
                        value: 'question',
                        label: 'Question',
                        icon: <LuHelpCircle />,
                      },
                      {
                        value: 'feedback',
                        label: 'Feedback',
                        icon: <LuMessageCircle />,
                      },
                    ]}
                  />
                  <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        border="0"
                        height="120px"
                        placeholder="What if..."
                        p="0"
                        _focus={{
                          boxshadow: 'none',
                          border: 0,
                        }}
                        _focusVisible={{
                          boxshadow: 'none',
                          border: 0,
                        }}
                        {...field}
                      ></Textarea>
                    )}
                  />

                  <UploadField name="files" />
                </FormLayout>
              </ModalBody>
              <ModalFooter gap="4" borderTopWidth="1px">
                <Text color="muted">
                  Email us at{' '}
                  <Link
                    href="mailto:hello@saas-ui.dev"
                    color="chakra-body-text"
                  >
                    hello@saas-ui.dev
                  </Link>
                  . We're committed to reading all messages, even if we can't
                  respond to every single one.
                </Text>
                <SubmitButton flexShrink="0">Send feedback</SubmitButton>
              </ModalFooter>
            </>
          )}
        </Form>
      </ModalContent>
    </Modal>
  )
}

interface ToggleButtonFieldProps<Type extends 'radio' | 'checkbox' = 'radio'>
  extends Omit<ToggleButtonGroupProps, 'value' | 'onChange'> {
  items: {
    value: Type extends 'radio' ? string : string[]
    label: string
    icon: React.ReactElement
  }[]
  value?: Type extends 'radio' ? string : string[]
  onChange?: (value: Type extends 'radio' ? string : string[]) => void
}

const ToggleButtonField = createField<ToggleButtonFieldProps>(
  forwardRef((props, ref) => {
    const { items, type = 'radio', onChange, ...rest } = props

    return (
      <ToggleButtonGroup
        ref={ref}
        type={type}
        isAttached={false}
        onChange={onChange as any}
        {...rest}
      >
        {items.map((item) => (
          <ToggleButton
            key={item.value}
            value={item.value}
            leftIcon={item.icon}
          >
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    )
  }),
  {
    isControlled: true,
  },
)

interface UploadFieldProps extends Omit<FileUploadOptions, 'onFilesChange'> {
  onChange?: (files: File[]) => void
}

const UploadField = createField<UploadFieldProps>(
  forwardRef((props, ref) => {
    const { onChange, maxFiles = 10, ...rest } = props
    return (
      <FileUpload
        maxFileSize={1024 * 1024}
        maxFiles={maxFiles}
        {...rest}
        onFilesChange={(files) => {
          onChange?.(files.acceptedFiles)
        }}
        inputRef={ref}
      >
        {({ files, deleteFile }) => (
          <FileUploadDropzone border="0" alignItems="start" px="0">
            {files.map((file) => (
              <HStack>
                <Text fontSize="sm">{file.name}</Text>
                <IconButton
                  aria-label="Remove file"
                  variant="ghost"
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(file)
                  }}
                >
                  <LuX />
                </IconButton>
              </HStack>
            ))}
            {files.length < maxFiles ? (
              <FileUploadTrigger>
                <HStack>
                  <LuPaperclip /> <Text>Attach images, files or videos.</Text>
                </HStack>
              </FileUploadTrigger>
            ) : null}
          </FileUploadDropzone>
        )}
      </FileUpload>
    )
  }),
  {
    isControlled: true,
  },
)

export default () => {
  const snackbar = useSnackbar()
  const disclosure = useDisclosure({
    defaultIsOpen: true,
  })

  const onSubmit: SubmitHandler<FeedbackInput> = (data) => {
    console.log(data)

    disclosure.onClose()
    snackbar.success('Thank you, your feedback has been submitted.')
  }

  return (
    <>
      <Button variant="primary" onClick={disclosure.onOpen}>
        Submit feedback
      </Button>
      <FeedbackModal
        onSubmit={onSubmit}
        {...disclosure}
        // These props are only required for demo purposes
        blockScrollOnMount={false}
        trapFocus={false}
      />
    </>
  )
}
