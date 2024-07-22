"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { chains } from "@/config/chains"
import { addressLabelSchema } from "@/config/schema"
import { createAddressLabel } from "@/lib/app/label"
import { useToast } from "@/lib/hooks/use-toast"

import { DashboardSubmitBulkLabels } from "@/components/app/dashboard-submit-bulk-labels"
import { DashboardSubmitLabelConfirm } from "@/components/app/dashboard-submit-label-confirm"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function TooltipHover({
  children,
  content,
}: {
  children: React.ReactNode
  content: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger type="button">{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}

export function DashboardSubmitLabel({ userId }: { userId: string }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [addressLabel, setAddressLabel] = useState<z.infer<
    typeof addressLabelSchema
  > | null>(null)

  const form = useForm<z.infer<typeof addressLabelSchema>>({
    resolver: zodResolver(addressLabelSchema),
    defaultValues: {
      blockchain: chains[0].id,
      address: "",
      addressName: "",
      labelType: "",
      labelSubType: "",
      label: "",
    },
  })

  function onSubmit(values: z.infer<typeof addressLabelSchema>) {
    if (values) {
      setAddressLabel(values)
      setShowConfirmation(true)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="blockchain"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-0.5">
                        <Label htmlFor="chain">Chain</Label>
                        <TooltipHover content="Name of the blockchain network">
                          <Icons.info className="size-4 text-secondary-foreground" />
                        </TooltipHover>
                      </div>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={chains[0].id}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a chain" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select a chain</SelectLabel>
                            {chains.map((chain) => (
                              <SelectItem key={chain.id} value={chain.id}>
                                {chain.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-0.5">
                      <Label htmlFor="address">Address</Label>
                      <TooltipHover content="Blockchain address being labeled">
                        <Icons.info className="size-4 text-secondary-foreground" />
                      </TooltipHover>
                    </div>
                    <Input type="text" placeholder="0x..." {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="addressName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-0.5">
                      <Label htmlFor="addressName">Address Name</Label>
                      <TooltipHover content="Blockchain address being labeled">
                        <Icons.info className="size-4 text-secondary-foreground" />
                      </TooltipHover>
                    </div>
                    <Input type="text" placeholder="e.g, 'MEV'" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-0.5">
                      <Label htmlFor="label">Label</Label>
                      <TooltipHover content="Concise label or tag for the address.">
                        <Icons.info className="size-4 text-secondary-foreground" />
                      </TooltipHover>
                    </div>
                    <Input
                      type="text"
                      placeholder="e.g., 'Uniswap'"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="labelType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-0.5">
                      <Label htmlFor="labelType">Label type</Label>
                      <TooltipHover content="Broad category of the label">
                        <Icons.info className="size-4 text-secondary-foreground" />
                      </TooltipHover>
                    </div>
                    <Input type="text" placeholder="e.g, 'token'" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="labelSubType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-0.5">
                      <Label htmlFor="labelSubType">Label Sub-Type</Label>
                      <TooltipHover content="Specific categorization under the label type.">
                        <Icons.info className="size-4 text-secondary-foreground" />
                      </TooltipHover>
                    </div>
                    <Input type="text" placeholder="e.g, 'ERC20'" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CardFooter className="flex justify-between px-0">
          <DashboardSubmitBulkLabels userId={userId} />
          <Button type="submit">Save Address</Button>
        </CardFooter>
      </form>
      {showConfirmation && addressLabel && (
        <DashboardSubmitLabelConfirm label={addressLabel} userId={userId} />
      )}
    </Form>
  )
}
