import * as React from 'react'

import { Box, Spacer, useColorModeValue } from '@chakra-ui/react'

import { EmptyState } from '@saas-ui/react'

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
  useFiltersContext,
} from '@saas-ui-pro/react'

import { useDebouncedCallback } from '@react-hookz/web'

import {
  DatePickerModal,
  DateValue,
  getLocalTimeZone,
} from '@saas-ui/date-picker'

import { DataBoard, DataBoardProps, useModals } from '@ui/lib'
import { ColumnFilter, TableState } from '@tanstack/react-table'

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
  view?: 'list' | 'board'
  board?: {
    header: DataBoardProps<D>['renderHeader']
    card: DataBoardProps<D>['renderCard']
    groupBy: DataBoardProps<D>['groupBy']
    onCardDragEnd: DataBoardProps<D>['onCardDragEnd']
  }
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
    view,
    board,
    ...rest
  } = props

  const gridRef = React.useRef<TableInstance<D>>(null)
  const boardRef = React.useRef<TableInstance<D>>(null)

  const [selections, setSelections] = React.useState<string[]>([])

  const _onSelectedRowsChange = React.useCallback((rows: string[]) => {
    onSelectedRowsChange?.(rows)
    setSelections(rows)
  }, [])

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [globalFilter, setGlobalFilter] = React.useState('')

  const onRowClick = (row: Row<D>, e: React.MouseEvent) => {
    // Find the first A and trigger a click.
    const link: HTMLAnchorElement | null = e.currentTarget.querySelector('td a')
    link?.click()
  }

  const onFilter = React.useCallback((filters: Filter[]) => {
    setColumnFilters(
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

  const onSearch = useDebouncedCallback(setGlobalFilter, [], 100)

  React.useEffect(() => {
    onSearch(searchQuery || '')
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

  // Shared state between grid and board views.
  const state: Partial<TableState> = {
    columnVisibility,
    columnFilters,
    globalFilter,
  }

  const getRowId = (row: any, index: number, parent?: Row<D>) =>
    row.id || `${parent ? [parent.id, index].join('.') : index}`

  let content
  if (!data || !data.length) {
    content = (
      <Box p="20">
        {emptyState || <EmptyState title="No results" variant="no-results" />}
      </Box>
    )
  } else if (view === 'board') {
    content = (
      <Box height="100%" width="100%" bg="page-body-bg-subtle">
        <DataBoard<D>
          instanceRef={boardRef}
          px="6"
          height="100%"
          columns={columns}
          data={data}
          renderHeader={board?.header}
          renderCard={board?.card}
          onCardDragEnd={board?.onCardDragEnd}
          noResults={NoFilteredResults}
          getRowId={getRowId}
          groupBy={board?.groupBy}
          initialState={{
            columnVisibility,
            ...initialState,
          }}
          state={state}
        />
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
        onColumnFiltersChange={setColumnFilters}
        noResults={NoFilteredResults}
        manualSorting={!!onSortChange}
        getRowId={getRowId}
        initialState={{
          columnVisibility,
          ...initialState,
        }}
        state={state}
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
      operators={operators}
      onChange={onFilter}
      onBeforeEnableFilter={onBeforeEnableFilter}
    >
      <TrackDefaultFilters defaultFilters={defaultFilters} />
      <Page
        isLoading={isLoading}
        position="relative"
        sx={{
          '& thead': {
            ...stickyStyles,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
            _dark: {
              boxShadow: '0 1px 2px 0 rgba(255, 255, 255, 0.08)',
            },
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

/**
 * We track default filters so we can dynamically change them when navigating, eg between tags in the sidebar.
 */
const TrackDefaultFilters: React.FC<{ defaultFilters?: Filter[] }> = ({
  defaultFilters,
}) => {
  const { enableFilter, activeFilters } = useFiltersContext()

  React.useEffect(() => {
    defaultFilters?.forEach((filter) => {
      const key = activeFilters?.find(({ id }) => id === filter.id)?.key
      enableFilter(key ? { key, ...filter } : filter)
    })
  }, [defaultFilters])

  return null
}
