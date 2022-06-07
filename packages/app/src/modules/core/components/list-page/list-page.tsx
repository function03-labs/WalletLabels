import * as React from 'react'

import { Box, useColorModeValue } from '@chakra-ui/react'

import { EmptyState, useModals } from '@saas-ui/react'

import {
  Page,
  PageProps,
  PageBody,
  DataGrid,
  DataGridProps,
  DataGridPagination,
  TableInstance,
  BulkActions,
  Row,
  ActiveFiltersList,
  Filter,
  FilterItem,
  FilterOperators,
  FiltersProvider,
  NoFilteredResults,
} from '@saas-ui/pro'

import { Filters, IdType } from 'react-table'

import { useDebouncedCallback } from '@react-hookz/web'

import { DatePickerModal } from '@saas-ui/date-picker'

interface ListPageProps<D extends object>
  extends PageProps,
    Pick<
      DataGridProps<D>,
      | 'columns'
      | 'data'
      | 'onSelectedRowsChange'
      | 'onSortChange'
      | 'initialState'
    > {
  emptyState: React.ReactNode
  bulkActions?: React.ReactNode
  filters?: FilterItem[]
  operators?: FilterOperators
  searchQuery?: string
}

/**
 * ListPage
 *
 * Use this component as a base for your list pages.
 */
export const ListPage = <D extends object>(props: ListPageProps<D>) => {
  const {
    title,
    toolbar,
    tabbar,
    emptyState,
    columns,
    data = [],
    isLoading,
    onSelectedRowsChange,
    onSortChange,
    bulkActions,
    filters,
    operators,
    searchQuery,
    initialState = {
      pageSize: 20,
    },
    ...rest
  } = props

  const [selections, setSelections] = React.useState<IdType<D>[]>([])

  const _onSelectedRowsChange = React.useCallback((rows: IdType<D>[]) => {
    onSelectedRowsChange?.(rows)
    setSelections(rows)
  }, [])

  const onRowClick = (row: Row<D>, e: React.MouseEvent) => {
    // Find the first A and trigger a click.
    const link: HTMLAnchorElement | null = e.currentTarget.querySelector('td a')
    link?.click()
  }

  const onFilter = React.useCallback((filters: Filter[]) => {
    gridRef.current?.setAllFilters(
      filters.map((filter) => {
        return {
          id: filter.id,
          operator: filter.operator,
          value: {
            value: filter.value,
            operator: filter.operator,
          },
        }
      }) as Filters<D>,
    )
  }, [])

  const onSearch = useDebouncedCallback(
    (query?: string) => {
      gridRef.current?.setGlobalFilter?.(query)
    },
    [],
    100,
  )

  React.useEffect(() => {
    onSearch(searchQuery)
  }, [searchQuery])

  const modals = useModals()

  const onBeforeEnableFilter = React.useCallback(
    (activeFilter: Filter, filter: FilterItem): Promise<Filter> => {
      return new Promise((resolve, reject) => {
        const { key, id, value } = activeFilter
        const { type, label } = filter

        if (type === 'date' && value === 'custom') {
          return modals.open({
            title: label,
            date: new Date(),
            onSubmit: (date: Date) => {
              resolve({ key, id, value: date, operator: 'after' })
            },
            onClose: () => reject(),
            component: DatePickerModal,
          })
        }

        resolve(activeFilter)
      })
    },
    [],
  )

  const gridRef = React.useRef<TableInstance<D>>(null)

  let content
  if (!data || !data.length) {
    content = (
      <Box p="20">
        {emptyState || <EmptyState title="No results" variant="no-results" />}
      </Box>
    )
  } else {
    content = (
      <DataGrid<D>
        ref={gridRef}
        columns={columns}
        data={data}
        isSelectable
        isSortable
        isHoverable
        onSelectedRowsChange={_onSelectedRowsChange}
        onRowClick={onRowClick}
        initialState={initialState}
        onSortChange={onSortChange}
        noResults={NoFilteredResults}
        manualSortBy={!!onSortChange}
        autoResetFilters={false}
        autoResetGlobalFilter={false}
      >
        <DataGridPagination />
      </DataGrid>
    )
  }

  const stickyStyles = {
    position: 'sticky',
    zIndex: 1,
    bg: useColorModeValue('whiteAlpha.400', 'blackAlpha.300'),
    backdropFilter: 'blur(5px)',
    borderBottomWidth: '1px',
    borderColor: useColorModeValue('blackAlpha.200', 'whiteAlpha.300'),
  }

  return (
    <FiltersProvider
      filters={filters}
      operators={operators}
      onChange={onFilter}
      onBeforeEnableFilter={onBeforeEnableFilter}
    >
      <Page
        title={title}
        toolbar={toolbar}
        tabbar={tabbar}
        isLoading={isLoading}
        fullWidth
        position="relative"
        sx={{
          '& thead th': {
            ...stickyStyles,
            top: 0,
            borderWidth: 0,
          },
          '& thead tr': {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            boxShadow: useColorModeValue(
              '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
              '0 1px 2px 0 rgba(255, 255, 255, 0.08)',
            ),
          },
          '& .saas-data-grid__pagination': {
            ...stickyStyles,
            bottom: 0,
            borderTopWidth: '1px',
          },
          '& tbody tr': {
            cursor: 'pointer',
          },
          '& tbody tr a:hover': {
            textDecoration: 'none',
          },
          '& tbody tr:last-of-type td': {
            borderBottomWidth: 0,
          },
        }}
        {...rest}
      >
        <BulkActions selections={selections} actions={bulkActions} />
        <ActiveFiltersList />
        <PageBody fullWidth>{content}</PageBody>
      </Page>
    </FiltersProvider>
  )
}
