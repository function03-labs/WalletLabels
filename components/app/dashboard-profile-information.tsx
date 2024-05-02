"use client"

import { User } from "@prisma/client"

import { Address } from "@/components/ui/address"

export function DashboardProfileInformation({ user }: { user: User }) {
  return (
    <div>
      <div className="mt-3 flex items-center">
        <span className="mr-1 font-bold">Address:</span>
        <Address link copy className="text-xs" address={user.id} />
      </div>
      <div className="mt-3 flex items-center">
        <span className="mr-1 font-bold">Created Keys: </span>
        {/* @ts-ignore: apikeys is there */}
        <span className="text-xs">{user.apiKeys.length}</span>{" "}
        <span className="mr-1 text-xs"> key(s)</span>
      </div>
    </div>
  )
}
