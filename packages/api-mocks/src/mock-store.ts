import { randUuid } from '@ngneat/falso'

import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

interface MockStoreRecord {
  id: string | number
  [key: string]: any
}

export interface MockStore<Type extends MockStoreRecord = MockStoreRecord> {
  data: Record<string, Type>
  setData(data: Record<string, Type>): void
  add(value: Type): void
  update(id: string | number, value: Type): void
  get(id?: string): Type | Record<string, Type>
  all(): Type[]
  remove(id: string | number): void
  filter(fn: (value: Type, i: number, arr: Type[]) => value is Type): Type[]
}

export const createMockStore = <Type extends MockStoreRecord = MockStoreRecord>(
  key: string,
  initialData: Record<string, Type> = {},
) => {
  const store = createStore<
    MockStore<Type>,
    [['zustand/persist', MockStore<Type>]]
  >(
    persist(
      (set, get) => ({
        data: initialData,
        setData: (data) => {
          set({ data })
        },
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
        all: () => {
          return Object.values(get().data)
        },
        filter: (fn) => {
          return Object.values(get().data).filter<Type>(fn)
        },
      }),
      {
        name: `app.mock-data.${key}`,
      },
    ),
  )

  return store
}
