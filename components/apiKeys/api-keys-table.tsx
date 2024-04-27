import React, { useState } from "react"
import { Check, Edit2Icon, X } from "lucide-react"

import { chains } from "@/config/networks"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupList,
  AvatarImage,
  AvatarOverflowIndicator,
} from "@/components/ui/avatarGroup"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { size } from "../../app/(general)/integration/sign-in-with-ethereum/opengraph-image"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface ApiKey {
  id: string
  name: string
  key: string
  createdDate: string
  chains: string[]
}
interface APIListItemProps {
  apiKey: ApiKey
}

const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_`

const apiKeys = [
  {
    id: 1,
    name: "My First API Key",
    key: "ThisIsA_Simulated_Key123",
    createdDate: "2024-04-24T00:00:00.000Z",
    chains: ["Polygon", "Optimism", "Arbitrum"],
  },
  {
    id: 2,
    name: "Backup API Key",
    key: "AnotherSimulated_Key789",
    createdDate: "2024-04-20T12:34:56.000Z",
    chains: ["Ethereum", "Solana"],
  },
  {
    id: 3,
    name: "Limited Access Key",
    key: "Limited_Access_Key456",
    createdDate: "2024-04-15T10:10:10.000Z",
    chains: ["Polygon"],
  },
]

export function ApiKeysTable() {
  return (
    <Table>
      <TableCaption>Currently, you are limited to 3 API Keys.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[220px]">Name</TableHead>
          <TableHead className="">Chains</TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeys.map((apiKey, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" defaultValue={apiKey.name} />
                <div className="flex  items-center gap-2 space-x-2">
                  <Button
                    size="icon"
                    className="hidden max-h-8 max-w-8"
                    type="submit"
                  >
                    <Check />
                  </Button>
                  <Button
                    size="icon"
                    type="submit"
                    className="hidden max-h-8 max-w-8"
                    variant="destructive"
                    hidden={true}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <AvatarGroup
                limit={8}
                className=" size-2 items-center justify-start"
              >
                <AvatarGroupList>
                  {apiKey.chains.map((chain, i) => (
                    <Avatar key={i} className="size-8">
                      <AvatarImage
                        alt="@shadcn"
                        key={chain}
                        name={chain}
                        src={iconUrl + chain + ".jpg"}
                      />
                    </Avatar>
                  ))}
                </AvatarGroupList>
                <AvatarOverflowIndicator />
              </AvatarGroup>
            </TableCell>
            <TableCell>{apiKey.key}</TableCell>
            <TableCell>{apiKey.createdDate}</TableCell>
            <TableCell className="text-right">
              <Button size="icon" variant="ghost">
                <Edit2Icon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  )
}

export default ApiKeysTable
