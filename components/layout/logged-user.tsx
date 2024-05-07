import { User } from "@prisma/client"

import { Address } from "@/components/ui/address"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"

export function LoggedUser({ user }: { user: User }) {
  return (
    <div>
      <IsSignedIn>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="-mt-1 text-sm font-semibold dark:text-white">
                {user.name}
              </h3>
              <span className="mt-1 text-xs dark:text-white/80">
                {user.email ? user.email : "No email"}
              </span>
            </div>
          </div>
        </div>
        <div className="dark:text-white/80">
          <p className="mt-1 text-xs">Connected as</p>
          <Address
            link
            copy
            className="mt-1 text-xs "
            truncate
            address={user.id}
          />
        </div>
      </IsSignedIn>
    </div>
  )
}
