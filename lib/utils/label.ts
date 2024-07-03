/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { AddressLabelType } from "@/types/label"

export function extractLabelData(data: any[]): AddressLabelType[] {
  return data.map((item: { [x: string]: any }) => {
    return {
      address: item[""],
      blockchain: item["Wallet Labels | Address Label Template"],
      addressName: item["_1"],
      labelType: item["_2"],
      labelSubType: item["_3"],
      label: item["_4"],
    }
  })
}
