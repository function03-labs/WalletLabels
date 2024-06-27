export interface QueryParameters {
  address: string
  limit: number
}

export interface Label {
  address: string
  address_name: string
  label_type: string
  label_subtype: string
  label: string
}

export interface Activity {
  count: number
  isRefined: boolean
  value: string
  label: string
  highlighted?: string
}

export type AddressLabelType = {
  blockchain: string
  address: string
  addressName: string
  labelType: string
  labelSubType: string
  label: string
}
