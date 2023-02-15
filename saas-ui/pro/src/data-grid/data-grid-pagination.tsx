import * as React from 'react'

import {
  chakra,
  IconButton,
  HTMLChakraProps,
  useMultiStyleConfig,
  SystemStyleObject,
} from '@chakra-ui/react'
import { useDataGridContext } from './data-grid'

import { ChevronLeftIcon, ChevronRightIcon } from '../icons'

import { cx } from '@chakra-ui/utils'
import { ButtonGroup, FormControl, FormLabel, Input } from '@chakra-ui/react'

export interface DataGridPaginationProps
  extends Omit<HTMLChakraProps<'div'>, 'onChange'> {
  onChange?(props: { pageIndex: number; pageSize: number }): void
}

export const DataGridPagination: React.FC<DataGridPaginationProps> = (
  props,
) => {
  const { className, onChange, ...rest } = props
  const { instance } = useDataGridContext()

  const state = instance.getState()

  const {
    pagination: { pageIndex, pageSize },
  } = state

  const styles = useMultiStyleConfig('SuiDataGridPagination', props) as Record<
    string,
    SystemStyleObject
  >

  const { nextPage, previousPage } = instance

  const pageCount = instance.getPageCount()

  const containerStyles = {
    px: 4,
    py: 2,
    display: 'flex',
    flexDirection: 'row',
    ...styles.container,
  }

  React.useEffect(() => {
    onChange?.({ pageIndex, pageSize })
  }, [pageIndex, pageSize])

  return (
    <chakra.div
      className={cx('sui-data-grid__pagination', className)}
      __css={containerStyles}
      {...rest}
    >
      <FormControl display="flex" flexDirection="row" alignItems="center">
        <FormLabel mb="0">Page</FormLabel>
        <Input
          type="number"
          value={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            instance.setPageIndex(page)
          }}
          onFocus={(e) => e.target.select()}
          w="20"
          size="sm"
          isDisabled={pageCount === 0}
        />
        <chakra.span ms="2"> of {pageCount}</chakra.span>
      </FormControl>

      <ButtonGroup ms="2">
        <IconButton
          onClick={previousPage}
          isDisabled={!instance.getCanPreviousPage()}
          icon={<ChevronLeftIcon />}
          aria-label="Previous page"
        />
        <IconButton
          onClick={nextPage}
          isDisabled={!instance.getCanNextPage()}
          icon={<ChevronRightIcon />}
          aria-label="Next page"
        />
      </ButtonGroup>
    </chakra.div>
  )
}
