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
  slug: string
  subscription?: Subscription
}

export type Subscription = {
  id: string
  plan: string
  status: string
  startedAt: string
  trialEndsAt: string
}

export type User = {
  id: string
  firstName: string
  lastName: string
  name: string
  email: string
  avatar?: string
  status?: string
  workspace?: {
    tags?: string[]
  }
  organizations?: Organization[]
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
  sortOrder?: number
  createdAt: string
  updatedAt?: string
}

export type Activity = {
  id: string
  userId?: string
  type: string
  data?: MetaData
  date: string
  createdAt: string
  updatedAt?: string
  user?: Partial<User>
}

export type Tags = {
  id: string
  label: string
  color?: string
  count?: number
}[]

export type Notification = {
  id: string
  userId?: string
  contactId: string
  type: string
  data?: MetaData
  date: string
  createdAt: string
  updatedAt?: string
  readAt?: string
  contact: Contact
  user?: Partial<User>
}

export type MetaData = Record<string, string | string[] | number | number[]>
