import { Button, Tooltip } from '@chakra-ui/react'
import { BulkActionsSelections } from '@saas-ui-pro/react'
import { Command } from '@saas-ui/react'
import { FiTag, FiCommand } from 'react-icons/fi'

export const bulkActions = ({
  selections,
}: {
  selections: BulkActionsSelections
}) => {
  return (
    <>
      <Tooltip
        placement="top"
        label={
          <>
            Add tags <Command>⇧ T</Command>
          </>
        }
      >
        <Button colorScheme="gray" leftIcon={<FiTag size="1em" />}>
          Add tags
        </Button>
      </Tooltip>
      <Tooltip
        placement="top"
        label={
          <>
            Command <Command>⇧ K</Command>
          </>
        }
      >
        <Button leftIcon={<FiCommand size="1em" />}>Command</Button>
      </Tooltip>
    </>
  )
}
