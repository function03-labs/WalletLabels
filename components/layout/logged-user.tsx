"use client"

import { User } from "@prisma/client"
import md5 from "md5"
import { useSession } from "next-auth/react"

import { Address } from "@/components/ui/address"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function LoggedUser({ user }: { user: User }) {
  const { data: session } = useSession()

  if (!session) return null

  // Generate Gravatar URL based on email
  const emailHash = md5(user.email.toLowerCase().trim())
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon&s=200`

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={gravatarUrl} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() ||
                user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="-mt-1 text-sm font-semibold dark:text-white">
              {user.name || user.email.split("@")[0]}
            </h3>
            <span className="mt-1 text-xs dark:text-white/80">
              {user.email}
            </span>
          </div>
        </div>
      </div>
      <div className="dark:text-white/80">
        <p className="mt-1 text-xs">Connected as</p>
        <Address
          link
          copy
          className="mt-1 text-xs"
          truncate
          address={user.email}
        />
      </div>
    </div>
  )
}
