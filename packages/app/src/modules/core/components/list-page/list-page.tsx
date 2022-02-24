import * as React from 'react'

import { Box } from '@chakra-ui/react'

import { EmptyState } from '@saas-ui/react'

import {
  Page,
  PageProps,
  DataGrid,
  DataGridProps,
  TableInstance,
  Row,
} from '@saas-ui/pro'

interface ListPageProps<D extends object> extends PageProps, DataGridProps<D> {
  emptyState: React.ReactNode
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
    emptyState,
    columns,
    data = [],
    isLoading,
    onSelectedRowsChange,
    ...rest
  } = props

  const onRowClick = (row: Row<D>, e: React.MouseEvent) => {
    // Find the first A and trigger a click.
    const link: HTMLAnchorElement | null = e.currentTarget.querySelector('td a')
    link?.click()
  }

  const gridRef = React.useRef<TableInstance<D>>(null)

  let content
  if (!data || !data.length) {
    content = (
      <Box p="20">{emptyState || <EmptyState title="No results" />}</Box>
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
        onSelectedRowsChange={onSelectedRowsChange}
        onRowClick={onRowClick}
        sx={{ cursor: 'pointer' }}
      />
    )
  }

  return (
    <Page
      title={title}
      toolbar={toolbar}
      isLoading={isLoading}
      fullWidth
      {...rest}
    >
      {content}
    </Page>
  )
}
