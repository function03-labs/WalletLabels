"use client"

import { User } from "@prisma/client"
import md5 from "md5"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function LoggedUser({ user }: { user: User }) {
  const { data: session } = useSession()

  if (!session) return null

  // Generate Gravatar URL based on email
  const emailHash = md5(user.email.toLowerCase().trim())
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon&s=200`

  return (
    <div data-oid="-asnq-u">
      <div className="flex items-center space-x-4" data-oid="zi8fuww">
        <div className="flex items-center space-x-2" data-oid="lrxj1-d">
          <Avatar data-oid="r2.tglk">
            <AvatarImage src={gravatarUrl} data-oid="4_4d_zc" />
            <AvatarFallback data-oid="vpwtsyf">
              {user.name?.charAt(0).toUpperCase() ||
                user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div data-oid=".kcdrev">
            <h3
              className="-mt-1 text-sm font-semibold dark:text-white"
              data-oid="57fatjs"
            >
              {user.name || user.email.split("@")[0]}
            </h3>
            <span
              className="mt-1 text-xs dark:text-white/80"
              data-oid="hodnn7h"
            >
              {user.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
