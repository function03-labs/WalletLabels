export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>

export type OrganizationMember = {
  id: string
  roles: Array<string>
}

export type Organization = {
  email?: string
  id: string
  logo?: string
  members: Array<OrganizationMember>
  name: string
  plan?: string
  slug: string
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  status?: string
}

export type Contact = {
  id: string
  firstName: string
  lastName: string
  name: string
  email: string
  avatar?: string
  status: string
  type: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export type Activity = {
  id: string
  type: string
  comment?: string
  date: string
}
