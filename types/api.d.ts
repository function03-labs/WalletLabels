import { ApiKey as AwsApiKey } from "@aws-sdk/client-api-gateway"

export type ApiKey = AwsApiKey & {
  key: string
  id: string
  name: string
  chains: string[]
}

export type Chain = {
  label: string
  value: string
  iconUrl: string
}
