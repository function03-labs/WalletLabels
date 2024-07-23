"use server"

import { prisma } from "@/lib/prisma"

import { AddressLabelType } from "@/types/label"

type CountType = {
  count: number
}

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

export async function bulkCreateAddressLabel(
  data: AddressLabelType[],
  userId: string
): Promise<CountType> {
  // @ts-ignore: Unreachable code error
  return await prisma.addressLabel.createMany({
    data: data.map((d) => ({
      blockchain: d.blockchain.toLowerCase(),
      address: d.address,
      addressName: d.addressName,
      labelType: d.labelType,
      label: d.label,
      labelSubType: d.labelSubType,
      userId,
    })),
  })
}
