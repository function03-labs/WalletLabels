import { chakra, HTMLChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { IconButton } from '@saas-ui/react'
import { useDataGridContext } from './data-grid'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { cx } from '@chakra-ui/utils'
import { ButtonGroup, FormControl, FormLabel, Input } from '@chakra-ui/react'

export const DataGridPagination: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const { className, ...rest } = props
  const instance = useDataGridContext()

  const styles = useMultiStyleConfig('DataGridPagination', props)

  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = instance

  const containerStyles = {
    px: 4,
    py: 2,
    display: 'flex',
    flexDirection: 'row',
    ...styles.container,
  }

  return (
    <chakra.div
      className={cx('saas-data-grid__pagination', className)}
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
            gotoPage(page)
          }}
          onFocus={(e) => e.target.select()}
          w="20"
          size="sm"
        />
        <chakra.span ms="2"> of {pageCount}</chakra.span>
      </FormControl>

      <ButtonGroup ms="2">
        <IconButton
          onClick={previousPage}
          isDisabled={!canPreviousPage}
          icon={<FiChevronLeft />}
          aria-label="Previous page"
        />
        <IconButton
          onClick={nextPage}
          isDisabled={!canNextPage}
          icon={<FiChevronRight />}
          aria-label="Next page"
        />
      </ButtonGroup>
    </chakra.div>
  )
}
