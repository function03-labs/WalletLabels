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
    <Tooltip data-oid="lctrjyq">
      <TooltipTrigger type="button" data-oid=":ayb4nz">
        {children}
      </TooltipTrigger>
      <TooltipContent data-oid="hpwyp9t">{content}</TooltipContent>
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
    <Form {...form} data-oid="h1pxqns">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        data-oid="01c7p.3"
      >
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          data-oid="pv6oph0"
        >
          <div className="space-y-2" data-oid="d1nq_f_">
            <FormField
              control={form.control}
              name="blockchain"
              render={({ field }) => (
                <FormItem data-oid="vej9cug">
                  <FormControl data-oid="4:_5-p8">
                    <div className="space-y-2" data-oid=":fw_-tt">
                      <div
                        className="flex items-center justify-between py-0.5"
                        data-oid="a5d0.l6"
                      >
                        <Label htmlFor="chain" data-oid="8h.t6gk">
                          Chain
                        </Label>
                        <TooltipHover
                          content="Name of the blockchain network"
                          data-oid="rmu:r7x"
                        >
                          <Icons.info
                            className="size-4 text-secondary-foreground"
                            data-oid="3z9q1m2"
                          />
                        </TooltipHover>
                      </div>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={chains[0].id}
                        data-oid="lh0pnxf"
                      >
                        <FormControl data-oid="hlh1cwi">
                          <SelectTrigger data-oid="faqf.3p">
                            <SelectValue
                              placeholder="Select a chain"
                              data-oid="frl4r-k"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent data-oid="v-0gvms">
                          <SelectGroup data-oid="gxloxnw">
                            <SelectLabel data-oid="h_sia0e">
                              Select a chain
                            </SelectLabel>
                            {chains.map((chain) => (
                              <SelectItem
                                key={chain.id}
                                value={chain.id}
                                data-oid="j3v-nqn"
                              >
                                {chain.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage data-oid="l-j:pm0" />
                </FormItem>
              )}
              data-oid="j5.dfd."
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem data-oid="m0fokd4">
                <FormControl data-oid="2_9hmlh">
                  <div className="space-y-2" data-oid="sfx5ma3">
                    <div
                      className="flex items-center justify-between py-0.5"
                      data-oid="dybftvc"
                    >
                      <Label htmlFor="address" data-oid="ani-iy:">
                        Address
                      </Label>
                      <TooltipHover
                        content="Blockchain address being labeled"
                        data-oid="f4-u4-5"
                      >
                        <Icons.info
                          className="size-4 text-secondary-foreground"
                          data-oid="bmikab_"
                        />
                      </TooltipHover>
                    </div>
                    <Input
                      type="text"
                      placeholder="0x..."
                      {...field}
                      data-oid="7f50z8c"
                    />
                  </div>
                </FormControl>
                <FormMessage data-oid="o2ckibr" />
              </FormItem>
            )}
            data-oid="h9d:dj5"
          />
        </div>
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          data-oid="zy4immd"
        >
          <FormField
            control={form.control}
            name="addressName"
            render={({ field }) => (
              <FormItem data-oid="a0ubg4k">
                <FormControl data-oid="dryjvpi">
                  <div className="space-y-2" data-oid="k8ch8p0">
                    <div
                      className="flex items-center justify-between py-0.5"
                      data-oid="s:.ohn4"
                    >
                      <Label htmlFor="addressName" data-oid="b4vnxef">
                        Address Name
                      </Label>
                      <TooltipHover
                        content="Blockchain address being labeled"
                        data-oid="w50_ycs"
                      >
                        <Icons.info
                          className="size-4 text-secondary-foreground"
                          data-oid="ow9_rmz"
                        />
                      </TooltipHover>
                    </div>
                    <Input
                      type="text"
                      placeholder="e.g, 'MEV'"
                      {...field}
                      data-oid="a-4m22g"
                    />
                  </div>
                </FormControl>
                <FormMessage data-oid="162x2l4" />
              </FormItem>
            )}
            data-oid="cd316pt"
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem data-oid="wy-1.0t">
                <FormControl data-oid="pyawrpw">
                  <div className="space-y-2" data-oid="5d9vwd_">
                    <div
                      className="flex items-center justify-between py-0.5"
                      data-oid="7x30tyj"
                    >
                      <Label htmlFor="label" data-oid="bh5zwdy">
                        Label
                      </Label>
                      <TooltipHover
                        content="Concise label or tag for the address."
                        data-oid="-73f5.1"
                      >
                        <Icons.info
                          className="size-4 text-secondary-foreground"
                          data-oid="_zpk:8-"
                        />
                      </TooltipHover>
                    </div>
                    <Input
                      type="text"
                      placeholder="e.g., 'Uniswap'"
                      {...field}
                      data-oid="k:xxjo6"
                    />
                  </div>
                </FormControl>
                <FormMessage data-oid="lojh4.-" />
              </FormItem>
            )}
            data-oid="ilcdswn"
          />
        </div>
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          data-oid="blv7g1s"
        >
          <FormField
            control={form.control}
            name="labelType"
            render={({ field }) => (
              <FormItem data-oid="xcc9dg1">
                <FormControl data-oid="1ys_f45">
                  <div className="space-y-2" data-oid="jotgujh">
                    <div
                      className="flex items-center justify-between py-0.5"
                      data-oid="8qqg3-:"
                    >
                      <Label htmlFor="labelType" data-oid="abm9k6t">
                        Label type
                      </Label>
                      <TooltipHover
                        content="Broad category of the label"
                        data-oid=".70wc8j"
                      >
                        <Icons.info
                          className="size-4 text-secondary-foreground"
                          data-oid="xs6o:7r"
                        />
                      </TooltipHover>
                    </div>
                    <Input
                      type="text"
                      placeholder="e.g, 'token'"
                      {...field}
                      data-oid=".9m7oe1"
                    />
                  </div>
                </FormControl>
                <FormMessage data-oid="-jon8th" />
              </FormItem>
            )}
            data-oid="ss-m7uw"
          />

          <FormField
            control={form.control}
            name="labelSubType"
            render={({ field }) => (
              <FormItem data-oid="of2.6ca">
                <FormControl data-oid="ntp26bp">
                  <div className="space-y-2" data-oid="95huta.">
                    <div
                      className="flex items-center justify-between py-0.5"
                      data-oid="_w4ak3l"
                    >
                      <Label htmlFor="labelSubType" data-oid="fkb4xne">
                        Label Sub-Type
                      </Label>
                      <TooltipHover
                        content="Specific categorization under the label type."
                        data-oid="c06jk_-"
                      >
                        <Icons.info
                          className="size-4 text-secondary-foreground"
                          data-oid="xzhc91u"
                        />
                      </TooltipHover>
                    </div>
                    <Input
                      type="text"
                      placeholder="e.g, 'ERC20'"
                      {...field}
                      data-oid="mqt5-rj"
                    />
                  </div>
                </FormControl>
                <FormMessage data-oid="ivmlpn0" />
              </FormItem>
            )}
            data-oid="-w2g9es"
          />
        </div>
        <CardFooter className="flex justify-between px-0" data-oid="6ohab2g">
          <DashboardSubmitBulkLabels userId={userId} data-oid="sn-.h9f" />
          <Button type="submit" data-oid="jssi0ld">
            Submit label
          </Button>
        </CardFooter>
      </form>
      {showConfirmation && addressLabel && (
        <DashboardSubmitLabelConfirm
          label={addressLabel}
          userId={userId}
          data-oid="zfzi:ca"
        />
      )}
    </Form>
  )
}
