"use client"

import { useUser } from "@/lib/hooks/use-user"
import { Address } from "@/components/ui/address"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"

export function LoggedUser() {
  const { user } = useUser()

  return (
    <div>
      <IsSignedIn>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="mt-2 text-sm font-semibold">Shadcn</h3>
              <span className="mt-1 text-xs">email here</span>
            </div>
          </div>
        </div>
        <div>
          <p className="mt-1 text-xs">Connected as</p>
          <Address
            link
            copy
            className="mt-1 text-xs "
            truncate
            address={user?.address}
          />
        </div>
      </IsSignedIn>
    </div>
  )
}
