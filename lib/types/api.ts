export interface ApiKeyRequest {
  id?: string
  name: string
  value?: string
}

// Export other types that might be needed
export interface ApiKeyResponse {
  id: string
  key: string
  name: string
  chains: string[]
  userId: string
  createdAt: Date
} 