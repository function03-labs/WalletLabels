export type UserAttributes = Record<string, any>
export type Flags = Record<string, any>

export interface AttrMap {
  key: string
  value: any
}

export interface Segment {
  id: string
  attr: AttrMap[]
  features: (string | Feature)[]
}

export interface Feature {
  id: string
  description?: string
  value?: any
}
