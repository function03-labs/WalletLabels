export interface Developer {
  email: string
  firstName: string
  lastName: string
  userName: string
  attributes?: Array<{
    name: string
    value: string
  }>
}

export interface DeveloperApp {
  name: string
  apiProducts: string[]
  callbackUrl?: string
  keyExpiresIn?: string
  status?: 'approved' | 'revoked'
}

export interface DeveloperAppResponse {
  name: string
  credentials: Array<{
    consumerKey: string
    consumerSecret: string
  }>
}

export interface ApigeeError {
  message: string
  error?: {
    message: string
  }
} 