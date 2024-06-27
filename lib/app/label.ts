"use server"

import { prisma } from "@/lib/prisma"

import { AddressLabelType } from "@/types/label"

export async function createAddressLabel(
  data: AddressLabelType,
  userId: string
): Promise<AddressLabelType> {
  return await prisma.addressLabel.create({
    data: {
      blockchain: data.blockchain,
      address: data.address,
      addressName: data.addressName,
      labelType: data.labelType,
      label: data.label,
      labelSubType: data.labelSubType,
      userId,
    },
  })
}
