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
  useBreakpointValue,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, CopyIcon } from '@chakra-ui/icons'

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdDate: string;
  chains: string[]; // Adding chains for demonstration
}
interface APIListItemProps {
  apiKey: ApiKey;
}

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
    <ButtonGroup ml={3} maxW={10} justifyContent="center" size="xs">
      <IconButton bg='green' icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton  icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <></>
  );
}

export const DataAPI = ({
  organization,
}: {
  organization: any
}) => {
  console.log(organization)
  const apiKeysIds= organization?.api_keys?? []
  const orgId = organization?.id?? ''

  const [showCopyKeyDialog, setShowCopyKeyDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [editingRowId, setEditingRowId] = useState('');
  const [generatedKey, setGeneratedKey] = useState<ApiKey | null>(null);
  const [deletedKey, setDeletedKey] = useState<ApiKey | null>(null);
  const [apiKeyError, setApiKeyError] = useState('');
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([]);
  const [loadComplete, setLoadComplete] = useState(false); // New state to track load completion

  useEffect(() => {
    const updateLocalApiKeys = () => {
      let updatedApiKeys = [...apiKeys]; // Create a shallow copy of the apiKeys to manipulate
  
      // If a key is generated, add it to the apiKeys array
      if (generatedKey) {
        console.log('Adding generated key to local apiKeys:', generatedKey);
        updatedApiKeys = [...updatedApiKeys, generatedKey];
      }
  
      // If a key is deleted, remove it from the apiKeys array
      if (deletedKey) {
        console.log('Removing deleted key from local apiKeys:', deletedKey);
        setDeletedKey(null);
        updatedApiKeys = updatedApiKeys.filter(key => key.id !== deletedKey.id);
  
      }
  
      // Update the apiKeys state with the new array
      console.log('Updated local apiKeys:', updatedApiKeys);
      setApiKeys(updatedApiKeys);
  
      // Assuming updateApiKeys sends the updated list to a server or external store
      const apiKeysIds = updatedApiKeys.map(key => key.id);
      console.log('Updating apiKeys on server:', apiKeysIds);
      updateApiKeys(orgId, apiKeysIds);
    };
  
    // Check if there's a change that requires an update
    if (generatedKey || deletedKey) {
      updateLocalApiKeys();
    }
  }, [generatedKey, deletedKey]);
  const loadAndSetApiKeys = async () => {
    console.log(apiKeysIds)
    for (const apiKeyId of apiKeysIds) {
      console.log('Loading API key:', apiKeyId);
      try {
        const apiKey: ApiKey = await getApiKey(apiKeyId);
        setApiKeys(prev => [...prev, apiKey]);
      } catch (error) {
        console.error(`Error loading API key ${apiKeyId}:`, error);
        setApiKeyError(`Error loading API key ${apiKeyId}: ${(error as Error).message}`);
      }
    }
    setLoadComplete(true); 
  };
  useEffect(() => {
    loadAndSetApiKeys();
  }, []);


  const apiDialog = useDisclosure();
  const deleteApiKeyFromServer = async (apiKeyId: string): Promise<void> => {
    const response = await fetch(`/api/apiKeys/${apiKeyId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to delete API key: ${errorBody}`);
    }
    console.log('Deleted API key from server:', apiKeyId);
  };
  
  const removeKeyFromState = (apiKeyId: string): void => {
    const deletedKey = apiKeys.find((key) => key.id === apiKeyId);
    if (!deletedKey) {
      console.warn(`API key not found in state: ${apiKeyId}`);
      return;
    }
    setDeletedKey(deletedKey);
  };
  
  const handleDeleteApiKey = async (apiKeyId: string) => {
    try {
      await deleteApiKeyFromServer(apiKeyId);
      removeKeyFromState(apiKeyId);
    } catch (error) {
      console.error('Error deleting API key:', error);
      setShowErrorDialog(true);
    }
  };
  const CustomEditableCell = ({
    isEditing,
    defaultValue,
    onUpdate,
    onCancel
  }: {
    isEditing: boolean
    defaultValue: string
    onUpdate: (value: string) => void
    onCancel?: () => void
  }) => {

    const handleUpdate = (value) => {
      if (value !== defaultValue) {
        onUpdate(value);
      }
    };
  
    return isEditing ? (
      <Editable
        defaultValue={defaultValue}
        isPreviewFocusable={false}
        onSubmit={handleUpdate}
        onCancel={onCancel}
        startWithEditView={isEditing}
        style={{ width: '100%', display: 'flex', flexDirection: 'row' }}
      >
        <EditablePreview style={{ flexGrow: 1, overflow: 'hidden' }} />
        <EditableInput
          style={{ flexGrow: 1, flexShrink: 1, width: '100%', paddingRight: '10px' }}
          pl={1}
          mr={2}
          onBlur={onCancel}
        />
        <EditableControls />
      </Editable>
    ) : (
      <Box style={{ width: '100%' }}>
        <Text isTruncated>{defaultValue}</Text>
      </Box>
    );
  };
  
  const handleUpdateName = async (apiKeyId, newName, onSuccess) => {
    try {
      const response = await fetch(`/api/apiKeys/${apiKeyId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName }), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update API key name');
      }
  
      const updatedKey = await response.json();
      console.log('API key name updated successfully:', updatedKey);
      onSuccess(apiKeyId, newName);
      } catch (error) {
      console.error('Error updating API key name:', error);
    }
  };
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => {
        return (
          <CustomEditableCell
          isEditing={editingRowId == info.row.id}
          defaultValue={info.getValue()}
          onUpdate={(newName) => {
            const apiKeyId = info.row.original.id;
            handleUpdateName(apiKeyId, newName, (id, updatedName) => {
              setApiKeys((currentApiKeys) => 
                currentApiKeys.map((key) => 
                  key.id === id ? { ...key, name: updatedName } : key
                )
              );
              setEditingRowId('')
            })
            .then(() => {
              console.log(`Updated name to: ${newName}`);
            })
            .catch((error) => {
              console.error('Failed to update name:', error);
            });
          }}
          onCancel={() => setEditingRowId('')}
          onEdit = {() => setEditingRowId('')}
        />
        );
      },
      enableResizing:true,
      minSize:100,
      maxSize:220,
    },
    {
      accessorKey: 'chains',
      header: 'Chains',
      cell: (info) => {
        return (
          <Box  overflow="hidden">
          <AvatarGroup size="xs" max={2}>
            {info.row.original.chains.map((chain, index) => (
              <Avatar key={index} name={chain} src={`https://icons.llamao.fi/icons/chains/rsz_${chain}.jpg`} />
            ))}
          </AvatarGroup>
        </Box>
        );
      },
      size: 5,
    },
    {
      accessorKey: 'key',
      header: 'Key',
      cell: (info) => {
        const { hasCopied, onCopy } = useClipboard(info.getValue())

        return (
          <VStack 
  
            align="start"
          >
            <Flex align="center" justify="space-between" w="full">
              <Input value={info.getValue()} isReadOnly pr="1rem" borderWidth='thin' isInvalid errorBorderColor='green' />
              <IconButton
                aria-label="Copy API Key"
                icon={<CopyIcon />}
                onClick={onCopy} 
                colorScheme={hasCopied ? 'green' : 'purple'}
                variant="solid"
                ml={2}
              />
            </Flex>
          </VStack>
        )
           },
      size: 280,
    },
    {
      accessorKey: 'createdDate',
      header: 'Created At',
      cell: (info) => {
        return <Text width='full'>{formatDate(new Date(info.getValue()))}</Text>;
      },
      size:5
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <HStack spacing={2}>
          <Button
            size="sm"
            onClick={() => setEditingRowId(info.row.id)}
          >
            <EditIcon />
          </Button>
          {/* <Button
            size="sm"
            colorScheme="red"
            onClick={() => {
              const apiKey = apiKeys[info.row.index];
              if (apiKey) {
                handleDeleteApiKey(apiKey.id);
              }
            }}
          >
            <DeleteIcon />
          </Button> */}
        </HStack>
      ),
      size:8
    },
  ], [editingRowId, apiKeys]);
  const getApiKey = async (id: string): Promise<ApiKey> => {
    let response; 
    try {
      response = await fetch(`/api/apiKeys/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      const apiKey: ApiKey = {
        id: data.id,
        name: data.name,
        key: data.value,
        createdDate: data.createdDate,
        chains: ['Polygon', 'Optimism', 'Arbitrum', 'Ethereum','Solana']
      };
  
      return apiKey;
    } catch (error) {
      console.error('Failed to get API key.', error);
      throw new Error(response ? `HTTP error! Status: ${response.status} ${response.statusText}` : 'Network error or unexpected error occurred.');
    }
  };

  const generateApiKey = async (name: string, orgId: string) => {
    try {
      const response = await fetch('/api/apiKeys/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, orgId }),
      })

      if (!response.ok) {
        console.error('Failed to generate API key. Status:', response.status)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      const newKey: ApiKey = {
        id: data.apiKeyDetails.id,
        name: data.apiKeyDetails.name,
        key: data.apiKeyDetails.value,
        createdDate: data.apiKeyDetails.createdDate,
        chains: ['Polygon', 'Optimism', 'Arbitrum', 'Ethereum','Solana'],
      }
      setGeneratedKey(newKey);
      setShowCopyKeyDialog(true)
    } catch (error) {
      console.error('Error generating API key:', error)
      setShowCopyKeyDialog(false) 
      setShowErrorDialog(true)
    }
  };

  const updateApiKeys = async (orgId:string,apiKeys: string[]) => {
    console.log('Adding API keys:', apiKeys);
    console.log('Org ID:', orgId) ;
    try {
      const response = await fetch('/api/apiKeys/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orgId, apiKeys }),
        });

      if (!response.ok) {
        console.error('Failed to generate API key. Status:', response.status)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

    } catch (error) {
      console.error('Error generating API key:', error)
      setShowCopyKeyDialog(false);
      setShowErrorDialog(true);
    }
}

  const onSubmit = async (data) => {
    await generateApiKey(data.name, orgId);
    apiDialog.onClose()
  }
  const onCloseErrorAlert = () => {
    setApiKeyError(''); 
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
        {loadComplete ? (
          apiKeys.length > 0 ? (
            <Box overflowX="auto">
              <DataTable key={editingRowId} columns={columns} data={apiKeys} />
            </Box>  
          ) : (
            <Text color={textColor}>No API Keys found</Text>
          )
        ) : (
          <Text color={textColor}>Loading...</Text> 
        )}
        <ApiCreateDialog apiProps={apiDialog} onSubmit={onSubmit} apiKeysCount={apiKeys.length} />
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
  const { hasCopied, onCopy } = useClipboard(apiKey.key);
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
            <Text>Your API Key has been successfully generated.</Text>
            <Flex align="center" justify="space-between" w="full">
              <Input value={apiKey.key} isReadOnly pr="1rem" />
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
  const cancelRef = useRef(); 

  const dialogBgColor = useColorModeValue('white', 'gray.700'); 

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





const ApiCreateDialog = ({ apiProps, onSubmit, apiKeysCount }: { apiProps: any; onSubmit: any; apiKeysCount: number }) => {
  if (apiKeysCount >= 3) {
    return (
      <FormDialog
        title="Generate an API Key"
        {...apiProps}
        defaultValues={{
          name: '',
          description: '',
        }}
      >
        <Text>You cannot create more than 3 API keys.</Text>
      </FormDialog>
    );
  }


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
            ];
            const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_`;
            if (value == '') return null;
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
            );
          }}
          options={[
            {
              value: 'All Chains',
              label: 'All Chains',
            },
          ]}
        />
      </FormLayout>
    </FormDialog>
  );
};