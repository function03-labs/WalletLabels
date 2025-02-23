"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"

import {
  cancelSub,
  pauseUserSubscription,
  unpauseUserSubscription,
} from "@/lib/app/actions"
import { toast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SubscriptionActionsProps {
  subscription: {
    lemonSqueezyId: string
    isPaused: boolean
    status: string
  }
  urls?: {
    customer_portal?: string
    update_payment_method?: string
  }
}

export function SubscriptionActions({
  subscription,
  urls,
}: SubscriptionActionsProps) {
  const [loading, setLoading] = useState(false)

  return (
    <DropdownMenu data-oid="n44_nun">
      <DropdownMenuTrigger asChild data-oid="9.zras:">
        <Button
          variant="ghost"
          size="icon"
          disabled={loading}
          data-oid="mq2hf6q"
        >
          <MoreHorizontal className="size-4" data-oid="ino7uib" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid="h1z79p.">
        {!subscription.isPaused && (
          <DropdownMenuItem
            onClick={async () => {
              try {
                setLoading(true)
                await pauseUserSubscription(subscription.lemonSqueezyId)
                toast.success("Subscription paused")
              } catch (error) {
                toast.error("Failed to pause subscription")
              } finally {
                setLoading(false)
              }
            }}
            data-oid="m00c4r."
          >
            Pause subscription
          </DropdownMenuItem>
        )}

        {subscription.isPaused && (
          <DropdownMenuItem
            onClick={async () => {
              try {
                setLoading(true)
                await unpauseUserSubscription(subscription.lemonSqueezyId)
                toast.success("Subscription resumed")
              } catch (error) {
                toast.error("Failed to resume subscription")
              } finally {
                setLoading(false)
              }
            }}
            data-oid="ez9-qqs"
          >
            Resume subscription
          </DropdownMenuItem>
        )}

        {urls?.customer_portal && (
          <DropdownMenuItem asChild data-oid="m-dxosu">
            <a
              href={urls.customer_portal}
              target="_blank"
              rel="noopener"
              data-oid="tvfjvb-"
            >
              Customer portal
            </a>
          </DropdownMenuItem>
        )}

        {urls?.update_payment_method && (
          <DropdownMenuItem asChild data-oid="3b090cr">
            <a
              href={urls.update_payment_method}
              target="_blank"
              rel="noopener"
              data-oid="kick9kw"
            >
              Update payment method
            </a>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator data-oid="xyg1uik" />

        <DropdownMenuItem
          className="text-destructive"
          onClick={async () => {
            if (confirm("Are you sure you want to cancel your subscription?")) {
              try {
                setLoading(true)
                await cancelSub(subscription.lemonSqueezyId)
                toast.success("Subscription cancelled")
              } catch (error) {
                toast.error("Failed to cancel subscription")
              } finally {
                setLoading(false)
              }
            }
          }}
          data-oid="ce73782"
        >
          Cancel subscription
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
