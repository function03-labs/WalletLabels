import React from "react"
import { ApiKey, User } from "@prisma/client"

import { DeleteAPIKey } from "@/components/shared/delete-apikey"
import { UpdateAPIKeyName } from "@/components/shared/update-apikey-name"
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
  apiKeyLimit,
}: {
  apiKeys: ApiKey[]
  user: User
  apiKeyLimit: number
}) {
  // Create a stable sorted array to prevent unnecessary re-renders
  const sortedApiKeys = React.useMemo(() => {
    return [...apiKeys].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
  }, [apiKeys])

  return (
    <Table data-oid="ufjzm-4">
      <TableCaption data-oid="iv7resr">
        Currently, you are limited to {apiKeyLimit} API Keys.
      </TableCaption>
      <TableHeader data-oid="8qc70vi">
        <TableRow data-oid="ej_px8g">
          <TableHead className="w-[150px]" data-oid="ebxoawi">
            Name
          </TableHead>
          <TableHead className="w-[420px]" data-oid="fv1lhz3">
            Key
          </TableHead>
          <TableHead data-oid="umo3iwc">Created At</TableHead>
          <TableHead data-oid="mrpzyqw">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody data-oid="lksxb5:">
        {sortedApiKeys.map((apiKey) => (
          // Use a compound key that includes both id and name to force re-render when either changes
          <TableRow key={`${apiKey.id}-${apiKey.name}`} data-oid="rqz_2jo">
            <TableCell className="font-medium" data-oid="pl5d3bi">
              <UpdateAPIKeyName
                key={`name-${apiKey.id}`}
                apiKey={apiKey}
                data-oid="wmm.ujz"
              />
            </TableCell>
            <TableCell data-oid="5rbk9cm">
              {apiKey.key.slice(0, 20)}.........{apiKey.key.slice(-15)}
            </TableCell>
            <TableCell data-oid="3mq7y:x">
              {apiKey.createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </TableCell>
            <TableCell data-oid="mso2qpr">
              <DeleteAPIKey
                key={`delete-${apiKey.id}`}
                apiKey={apiKey}
                userEmail={user.email}
                data-oid="2nbn5d:"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
