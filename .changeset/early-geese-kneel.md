---
'app': minor
'@saas-ui/pro': minor
---

BREAKING: Updated to React Table v8

The v8 API has changed quite a bit, so we have to introduce some breaking changes.

The column definitions.

- isNumeric and href now need to be set in the new column meta object.
- accessor renamed to accessorKey.
- filter is now filterFn
- Header and Cell are now lowercase, header and cell.
- width is now size and only accept a number.

```
const columns: ColumnDef<Contact>[] = [
  {
    id: 'name',
    accessorKey: 'fullName',
    header: 'Name',
    size: 300,
    meta: {
      href: ({ id }) => `/app/${tenant}/contacts/view/${id}`,
    },
  }
]
```

- cell.value is now cell.getValue()

```
const DateCell: DataGridCell<Contact> = ({ cell }) => {
  return <>{format(new Date(cell.getValue<string>()), 'PP')}</>
}
```

Updated table props

- ref is now a ref to the container element, use `instanceRef` to get access to the React Table instance.
- plugins no longer supported, you can use the new getXModel() API now.
- initialState has an updated type signature.
- new state property, that allows you to partially control the table state.

More info: https://tanstack.com/table/v8/docs
