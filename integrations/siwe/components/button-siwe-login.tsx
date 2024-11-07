"use client"

import { HTMLAttributes } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAccount, useNetwork, useSignMessage } from "wagmi"

import { useToast } from "@/lib/hooks/use-toast"
import { useUser } from "@/lib/hooks/use-user"
import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { siweLogin } from "@/integrations/siwe/actions/siwe-login"

interface ButtonSIWELoginProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
  disabled?: boolean
}

export const ButtonSIWELogin = ({
  className,
  label = "Dashboard",
  disabled,
  children,
  ...props
}: ButtonSIWELoginProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { mutateUser, user } = useUser()
  const { isLoading, signMessageAsync } = useSignMessage()

  const handleCreateMessage = async () => {
    if (user.isLoggedIn) {
      router.push("/dashboard")
    } else {
      try {
        if (!address || !chain?.id) {
          return toast({
            title: "Error",
            description:
              "Please connect your wallet first, click on the 'Connect Wallet' button.",
            variant: "destructive",
          })
        }
        await siweLogin({ address, chainId: chain?.id, signMessageAsync })
        await mutateUser()

        router.refresh()
        router.push("/dashboard")
      } catch (error) {
        console.error(error)
      }
    }
  }
  const classes = cn("relative", className)
  const labelClasses = cn({
    "opacity-0": isLoading,
  })

  return (
    <>
      {user?.isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className={classes}
              disabled={disabled}
              type="button"
              {...props}
            >
              {isLoading && (
                <Icons.loading className="absolute -left-6 size-3 animate-spin" />
              )}
              <span className={labelClasses}>
                {children || label || "Logout"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="w-full" href="/dashboard">
                API Keys
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" href="/dashboard/profile">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" href="/dashboard/subscription">
                Subscription
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" href="/dashboard/submit">
                Submit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          size="sm"
          className={classes}
          disabled={disabled}
          type="button"
          onClick={() => void handleCreateMessage()}
          {...props}
        >
          {isLoading && (
            <Icons.loading className="absolute -left-6 size-5 animate-spin" />
          )}
          <span className={labelClasses}>{children || label || "Logout"}</span>
        </Button>
      )}
    </>
  )
}
