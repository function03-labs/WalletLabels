import * as React from 'react'

import { Box, Spacer, useColorModeValue } from '@chakra-ui/react'

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
  BulkActionsProps,
  ColumnFiltersState,
  useColumnVisibility,
  ResetFilters,
  PageHeaderProps,
  PageHeader,
} from '@saas-ui-pro/react'

import { useDebouncedCallback } from '@react-hookz/web'

import {
  DatePickerModal,
  DateValue,
  getLocalTimeZone,
} from '@saas-ui/date-picker'

export interface ListPageProps<D extends object>
  extends PageProps,
    PageHeaderProps,
    Pick<
      DataGridProps<D>,
      | 'columns'
      | 'data'
      | 'onSelectedRowsChange'
      | 'onSortChange'
      | 'initialState'
    > {
  emptyState: React.ReactNode
  bulkActions?: BulkActionsProps['children']
  filters?: FilterItem[]
  defaultFilters?: Filter[]
  operators?: FilterOperators
  searchQuery?: string
  visibleColumns: string[]
  tabbar?: React.ReactNode
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
    visibleColumns,
    data = [],
    isLoading,
    onSelectedRowsChange,
    onSortChange,
    bulkActions,
    filters,
    defaultFilters,
    operators,
    searchQuery,
    initialState = {
      pagination: {
        pageSize: 20,
      },
    },
    ...rest
  } = props

  const gridRef = React.useRef<TableInstance<D>>(null)

  const [selections, setSelections] = React.useState<string[]>([])

  const _onSelectedRowsChange = React.useCallback((rows: string[]) => {
    onSelectedRowsChange?.(rows)
    setSelections(rows)
  }, [])

  const onRowClick = (row: Row<D>, e: React.MouseEvent) => {
    // Find the first A and trigger a click.
    const link: HTMLAnchorElement | null = e.currentTarget.querySelector('td a')
    link?.click()
  }

  const onFilter = React.useCallback((filters: Filter[]) => {
    gridRef.current?.setColumnFilters(
      filters.map((filter) => {
        return {
          id: filter.id,
          value: {
            value: filter.value,
            operator: filter.operator,
          },
        }
      }) as ColumnFiltersState,
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
            onSubmit: (date: DateValue) => {
              resolve({
                key,
                id,
                value: date.toDate(getLocalTimeZone()),
                operator: 'after',
              })
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

  const columnVisibility = useColumnVisibility({
    columns,
    visibleColumns,
  })

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
        instanceRef={gridRef}
        columns={columns}
        data={data}
        isSelectable
        isSortable
        isHoverable
        onSelectedRowsChange={_onSelectedRowsChange}
        onRowClick={onRowClick}
        onSortChange={onSortChange}
        noResults={NoFilteredResults}
        manualSorting={!!onSortChange}
        getRowId={(row: any, index, parent) =>
          row.id || `${parent ? [parent.id, index].join('.') : index}`
        }
        initialState={{
          columnVisibility,
          ...initialState,
        }}
        state={{
          columnVisibility,
        }}
      >
        <DataGridPagination />
      </DataGrid>
    )
  }

  const stickyStyles = {
    position: 'sticky',
    zIndex: 1,
    bg: 'chakra-body-bg',
    borderWidth: 0,
  }

  return (
    <FiltersProvider
      filters={filters}
      activeFilters={defaultFilters} // Pass the default filters to active filters, so they are updated when the filters change.
      operators={operators}
      onChange={onFilter}
      onBeforeEnableFilter={onBeforeEnableFilter}
    >
      <Page
        isLoading={isLoading}
        position="relative"
        sx={{
          '& thead th': {
            ...stickyStyles,
            top: 0,
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
          '& .sui-data-grid__pagination': {
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
        <PageHeader title={title} toolbar={toolbar} footer={tabbar} />
        <BulkActions
          selections={selections}
          variant="floating"
          motionPreset="slideOutBottom"
          colorScheme="gray"
          position="fixed"
          _dark={{
            bg: 'gray.700',
          }}
        >
          {bulkActions}
        </BulkActions>
        <ActiveFiltersList size="sm">
          <Spacer />
          <ResetFilters>Clear all</ResetFilters>
        </ActiveFiltersList>
        <PageBody p="0" contentWidth="full">
          {content}
        </PageBody>
      </Page>
    </FiltersProvider>
  )
}
