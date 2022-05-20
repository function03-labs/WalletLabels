import { randUuid } from '@ngneat/falso'

import create from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

interface MockStoreRecord {
  id: string | number
  [key: string]: any
}

export interface MockStore<Type extends MockStoreRecord = MockStoreRecord> {
  data: Record<string, Type>
  add(value: Type): void
  update(id: string | number, value: Type): void
  remove(id: string | number): void
}

export const createMockStore = <Type extends MockStoreRecord = MockStoreRecord>(
  key: string,
) => {
  const store = create<MockStore<Type>>(
    persist(
      (set, get) => ({
        data: {},
        add: (value) => {
          const data = get().data

          data[value.id || randUuid()] = value

          set({ data })
        },
        update: (id, value) => {
          const data = get().data

          data[id] = value

          set({ data })
        },
        remove: (id) => {
          const data = get().data

          delete data[id]

          set({ data })
        },
        get: (id?: string) => {
          const data = get().data

          if (id) {
            return data[id]
          }

          return data
        },
      }),
      {
        name: `app.mock-data.${key}`,
      },
    ),
  )

  return store
}
