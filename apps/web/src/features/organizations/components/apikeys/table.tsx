import {
  DataTable,
  FormDialog,
  FormLayout,
  Field,
  Modal,
  Web3Address,
  ColumnDef,
  CheckIcon,
  CloseIcon
} from '@saas-ui/react'
import { FiAlertTriangle } from 'react-icons/fi';


import { ActivityData } from '@api/client'
import { useEffect, useMemo, useRef, useState } from 'react'

import React from 'react'
import {
  Button,
  Text,
  Box,
  HStack,
  useDisclosure,
  AvatarGroup,
  Avatar,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  ModalFooter,
  ModalHeader,
  useClipboard,
  VStack,
  Flex,
  useColorModeValue,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  ButtonGroup,
  useEditableControls,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, CopyIcon } from '@chakra-ui/icons'
import { getCurrentUser } from '@api/client'

interface ApiKey {
  id: string;
  name: string;
  key: string;
  dateCreated: string;
  chains: string[]; // Adding chains for demonstration
}
interface APIListItemProps {
  apiKey: ApiKey;
}

const currentUser = getCurrentUser();
console.log(currentUser);

const formatDate = (date: Date) => {

  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="xs">
      <IconButton bg='green' icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton  icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <></>
  );
}


// Define columns for DataTable





export const DataAPI = ( organization ) => {
  // const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showCopyKeyDialog, setShowCopyKeyDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [editingRowId, setEditingRowId] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  const [apiKeys, setApiKeys] = React.useState([
    {
      id: '1',
      name: 'Production Key',
      chains: ['ethereum', 'polygon'],
      key: '0x1235xwd5c1efevc51c50c5wcw51cw0c',
      createdAt: new Date('2023-02-01')
    },
    {
      id: '2',
      name: 'Development Key',
      chains: ['optimism'],
      key: '0x456dsdsd5cxc0s5cs00510cwsfccxc',
      createdAt: new Date('2023-02-01')
    }
  ])
  const CustomEditableCell = ({ isEditing, defaultValue, onUpdate, onCancel }) => {
    const initialFocusRef = React.useRef(null); // Used for focusing the input initially

    return isEditing ? (
      <Editable
        defaultValue={defaultValue}
        isPreviewFocusable={false} 
        onSubmit={onUpdate}
        startWithEditView={isEditing}
      >
        <EditablePreview />
        <EditableInput maxW={185} pl={1} mr={2}ref={initialFocusRef} />
        <EditableControls  />
      </Editable>
    ) : (
      <Box minW="200px">
        <Text>{defaultValue}</Text>
      </Box>
    );
  };
  const apiDialog = useDisclosure();
  const  handleDeleteApiKey =  (rowId: string): void => {
    //TODO
  }
  const columns: ColumnDef<ApiKey>[] = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => {
        const inputRef = useRef(null);
        const isEditing = editingRowId === info.row.id;

        const handleNameUpdate = (newName: string) => {
          console.log(`Updated name to: ${newName}`);
          setEditingRowId(''); // Exit edit mode
        };

        return (
          <CustomEditableCell
            isEditing={isEditing}
            defaultValue={info.getValue()}
            onUpdate={handleNameUpdate}
            onCancel={() => setEditingRowId('')}
          />
        );
      },
    },
    {
      accessorKey: 'chains',
      header: 'Chains',
      cell: (info) => {
        const chains = info.row.original.chains || []; // Ensure chains is always an array
        return (
          <AvatarGroup size="xs" max={2}>
            {chains.map((chain, index) => (
              <Avatar key={index} name={chain} src={`https://icons.llamao.fi/icons/chains/rsz_${chain}.jpg`} />
            ))}
          </AvatarGroup>
        );
      },
    },
    {
      accessorKey: 'key',
      header: 'Key',
      cell: (info) => <Web3Address address={info.getValue()} />
    },
    {
      accessorKey: 'dateCreated',
      header: 'Created At',
      cell: (info) => formatDate(new Date(info.getValue())),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (info) => {


        return (
          <HStack spacing={2}>
            <Button size="sm" onClick={() => {
              setEditingRowId(info.row.id);
            }
            } >
              <EditIcon />
            </Button>
            <Button size="sm" colorScheme="red" onClick={() => handleDeleteApiKey(info.row.id)}>
              <DeleteIcon />
            </Button>
          </HStack>
        );
      }
    },
  ], [editingRowId]);

  const generateApiKey = async (name: string, orgId: string) => {
    try {
      const response = await fetch('/api/apiKeys/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, orgId }),
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
        chains: []
      };
      setGeneratedKey(newKey);
      setApiKeys((prevKeys) => [...prevKeys, newKey]);
      setShowCopyKeyDialog(true);
    } catch (error) {
      console.error('Error generating API key:', error);
      setShowCopyKeyDialog(false); // Ensure dialog does not show on error
      setShowErrorDialog(true);
    }

  };
  const onSubmit = async (data) => {
    await generateApiKey(data.name,organization);
    apiDialog.onClose()
  }
  const onCloseErrorAlert = () => {
    setApiKeyError(''); // Reset error message to hide the alert
    setShowErrorDialog(false);
  };
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const buttonBgColor = 'purple.500';
  const hoverBgColor = 'purple.600';



  return (
    <Box bg={bgColor} p={5} rounded="md" shadow="base" borderColor={borderColor} borderWidth="1px">
      <VStack align="stretch" spacing={4}>
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            API Keys
          </Text>
          <Button
            onClick={apiDialog.onOpen}
            bg={buttonBgColor}
            color="white"
            _hover={{ bg: hoverBgColor }}
            variant="solid"
          >
            Generate
          </Button>
        </Box>
        <Text fontSize="sm" color={textColor}>
          Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them.
        </Text>
        <Text fontSize="sm" color={textColor}>
          Do not share your API key with others, or expose it in the browser or other client-side code.
        </Text>
        {apiKeys.length > 0 ? (
          <Box overflowX="auto">
            <DataTable key={editingRowId} columns={columns} data={apiKeys} />
          </Box>
        ) : (
          <Text color={textColor}>No API Keys found</Text>
        )}
        <ApiCreateDialog apiProps={apiDialog} onSubmit={onSubmit} />
        {showCopyKeyDialog && <CopyApiKeyDialog apiKey={generatedKey} onClose={() => setShowCopyKeyDialog(false)} />}
        <ErrorAlertDialog
          isOpen={showErrorDialog}
          onClose={onCloseErrorAlert}
          title="Error Occurred"
          description="An error occurred while processing your request. Please try again."
        />
      </VStack>
    </Box>


  );
}


const CopyApiKeyDialog = ({ apiKey, onClose }) => {
  const { hasCopied, onCopy } = useClipboard(apiKey);
  const modalBgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const buttonColorScheme = hasCopied ? 'green' : 'purple';

  return (
    <Modal motionPreset='slideInBottom' isOpen={!!apiKey} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent bg={modalBgColor} color={textColor} rounded="lg" shadow="dark-lg">
        <ModalHeader>API Key Generated</ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="start">
            <Text>Your API Key has been successfully generated. Please copy and store it securely as it will not be shown again.</Text>
            <Flex align="center" justify="space-between" w="full">
              <Input value={apiKey.key} isReadOnly pr="4.5rem" />
              <IconButton
                aria-label="Copy API Key"
                icon={<CopyIcon />}
                onClick={onCopy}
                ml={2}
                colorScheme={buttonColorScheme}
                variant="solid"
              />
            </Flex>
            {hasCopied && <Text color="green.500">Copied to clipboard!</Text>}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ErrorAlertDialog = ({ isOpen, onClose, title, description }) => {
  const cancelRef = useRef(); // Ref for the cancel button to focus on it initially

  const dialogBgColor = useColorModeValue('white', 'gray.700'); // Adjusting background color for light/dark mode

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg={dialogBgColor}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <Icon as={FiAlertTriangle} mr={2} w={6} h={6} color="red.500" />
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {description}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};





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