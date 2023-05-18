import { createModals } from '@saas-ui/react'
import { FormDialog } from '../form'

export const { ModalsProvider, useModals } = createModals({
  modals: {
    form: FormDialog,
  },
})
