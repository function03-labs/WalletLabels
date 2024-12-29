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
    <Table>
      <TableCaption>
        Currently, you are limited to {apiKeyLimit} API Keys.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Name</TableHead>
          <TableHead className="w-[420px]">Key</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedApiKeys.map((apiKey) => (
          // Use a compound key that includes both id and name to force re-render when either changes
          <TableRow key={`${apiKey.id}-${apiKey.name}`}>
            <TableCell className="font-medium">
              <UpdateAPIKeyName key={`name-${apiKey.id}`} apiKey={apiKey} />
            </TableCell>
            <TableCell>
              {apiKey.key.slice(0, 20)}.........{apiKey.key.slice(-15)}
            </TableCell>
            <TableCell>
              {apiKey.createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>
              <DeleteAPIKey
                key={`delete-${apiKey.id}`}
                apiKey={apiKey}
                userEmail={user.email}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
