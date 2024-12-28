import React from "react"
import { ApiKey, User } from "@prisma/client"

import { chains } from "@/config/blockchain-networks"

// import { Address } from "@/components//ui/address"
import { DeleteAPIKey } from "@/components/shared/delete-apikey"
import { UpdateAPIKeyName } from "@/components/shared/update-apikey-name"
import {
  Avatar,
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DashboardTableAPIKeys({
  apiKeys,
  user,
}: {
  apiKeys: ApiKey[]
  user: User
}) {
  return (
    <Table>
      <TableCaption>Currently, you are limited to 3 API Keys.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Name</TableHead>
          <TableHead className="mx-6">Chains</TableHead>
          <TableHead className="w-[420px]">Key</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeys
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((apiKey, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <UpdateAPIKeyName apiKey={apiKey} />
              </TableCell>

              <TableCell>
                <AvatarGroup
                  limit={3}
                  className="size-2 items-center justify-start"
                >
                  <AvatarGroupList>
                    {chains
                      .filter((chain) => apiKey.chains.includes(chain.value))
                      .map((chain) => (
                        <Avatar key={chain.label} className="size-8">
                          <AvatarImage
                            alt={chain.label}
                            key={chain.label}
                            src={chain.iconUrl}
                          />
                        </Avatar>
                      ))}
                  </AvatarGroupList>
                  <AvatarOverflowIndicator />
                </AvatarGroup>
              </TableCell>

              <TableCell>
                {/* <Address copy address={apiKey.key} /> */}
              </TableCell>
              <TableCell>
                {apiKey.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <DeleteAPIKey apiKey={apiKey} userEmail={user.email} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
