import * as React from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
  forwardRef,
  Avatar,
} from '@chakra-ui/react'
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload'
import { Form, FormLayout, SubmitButton, createField } from '@saas-ui/forms'

export interface AddUserAddUserDrawerProps {
  /**
   * This is only required to run this demo and should be removed in your implementation.
   */
  getRootNode?: () => HTMLElement
  children: React.ReactNode
}

export const AddContactDrawer: React.FC<AddUserAddUserDrawerProps> = (
  props,
) => {
  const disclosure = useDisclosure({
    defaultIsOpen: true,
  })

  const onSubmit = () => {}

  return (
    <>
      <Button onClick={() => disclosure.onOpen()}>Add contact</Button>

      {/* Remove blockScrollOnMount in your implementation */}
      <Drawer {...disclosure} blockScrollOnMount={false}>
        <DrawerOverlay />
        <Form onSubmit={onSubmit}>
          {({ Field }) => (
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Add contact</DrawerHeader>

              <DrawerBody>
                <FormLayout>
                  <ProfileImageField
                    name="profileImage"
                    label="Photo"
                    getRootNode={props.getRootNode}
                  />
                  <Field name="name" label="Name" isRequired />
                  <Field
                    name="email"
                    label="Email address"
                    type="email"
                    isRequired
                  />
                  <Field name="company" label="Company" />
                  <Field
                    name="about"
                    label="About"
                    type="textarea"
                    help="Max 100 words."
                  />
                  <Field
                    name="type"
                    label="Type"
                    type="radio"
                    options={[
                      { label: 'Lead', value: 'lead' },
                      { label: 'Customer', value: 'customer' },
                    ]}
                  />
                </FormLayout>
              </DrawerBody>

              <DrawerFooter alignItems="flex-end">
                <Button variant="secondary" mr={3} onClick={disclosure.onClose}>
                  Cancel
                </Button>
                <SubmitButton>Create</SubmitButton>
              </DrawerFooter>
            </DrawerContent>
          )}
        </Form>
      </Drawer>
    </>
  )
}

const ProfileImageField = createField(
  forwardRef((props, ref) => {
    const { onChange, ...rest } = props

    const [preview, setPreview] = React.useState<string | undefined>()

    return (
      <FileUpload
        maxFileSize={1024 * 1024}
        accept="image/*"
        {...rest}
        onFilesChange={(files) => {
          if (files.acceptedFiles?.length) {
            onChange(files.acceptedFiles[0])
          }
        }}
        maxFiles={1}
        inputRef={ref}
      >
        {({ files, deleteFile, createFileUrl }) => {
          React.useEffect(() => {
            if (files[0]) {
              createFileUrl(files[0], setPreview)
            }
          }, [files[0]])
          return (
            <HStack spacing="4">
              <Avatar size="lg" src={preview || props.value} />
              <FileUploadDropzone border="0" p="0">
                {!files?.length ? (
                  <FileUploadTrigger as={Button}>Upload</FileUploadTrigger>
                ) : (
                  <HStack>
                    <Text fontSize="sm">{files[0].name}</Text>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteFile(files[0])
                      }}
                    >
                      Clear
                    </Button>
                  </HStack>
                )}
              </FileUploadDropzone>
            </HStack>
          )
        }}
      </FileUpload>
    )
  }),
  {
    isControlled: true,
  },
)
