import { Row } from '@tanstack/react-table'

import { DataGridColumnMeta } from './data-grid'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData, TValue>
    extends DataGridColumnMeta<TData, TValue> {}
}
