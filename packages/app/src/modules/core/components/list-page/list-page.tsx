import { Box } from '@chakra-ui/react'

import { DataTable, DataTableProps, EmptyState } from '@saas-ui/react'

import { Page, PageProps } from '@saas-ui/pro'

interface ListPageProps<D extends object> extends PageProps, DataTableProps<D> {
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

  let content
  if (!data || !data.length) {
    content = (
      <Box p="20">{emptyState || <EmptyState title="No results" />}</Box>
    )
  } else {
    content = (
      <DataTable<D>
        columns={columns}
        data={data}
        isSelectable
        isSortable
        onSelectedRowsChange={onSelectedRowsChange}
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
