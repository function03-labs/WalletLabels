import { useRouter } from 'next/router'
import { useState } from 'react'

// import { useCreateContactMutation } from '@app/graphql'

import * as Yup from 'yup'

import { DataTable, AutoForm, useModals } from '@saas-ui/react'

import { Page, Toolbar, ToolbarButton } from '@saas-ui/pro'

type Dict = Record<string, any>

const StatusCell = (cell: any) => {
  switch (cell.status) {
    case 'error':
      return 'Error'
    case 'active':
      return 'Active'
    case 'inactive':
      return 'Inactive'
    case 'new':
    default:
      return 'New'
  }
}

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

export function ContactsListPage() {
  const modals = useModals()

  const toolbar = (
    <Toolbar>
      <ToolbarButton
        label="Add contact"
        variant="solid"
        onClick={() => {
          modals.open?.({
            title: 'Add contact',
            body: (
              <AutoForm
                defaultValues={{
                  name: '',
                }}
                schema={schema}
                submitLabel="Add contact"
                onSubmit={() => Promise.resolve()}
              />
            ),
          })
        }}
      />
    </Toolbar>
  )

  const columns = [
    {
      id: 'name',
      Header: 'Name',
      href: ({ id, project }: Dict) => `/projects/${project.slug}/apps/${id}`,
    },
    {
      id: 'type',
      Header: 'Type',
      accessor: 'package.name',
    },
    {
      id: 'status',
      Header: 'Status',
      Cell: StatusCell,
    },
  ]

  const tableData: any = []

  return (
    <Page title="Contacts" toolbar={toolbar} fullWidth>
      <DataTable columns={columns} data={tableData} />
    </Page>
  )
}
