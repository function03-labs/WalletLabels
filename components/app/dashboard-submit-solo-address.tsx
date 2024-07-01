"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { chains } from "@/config/chains"
import { addressLabelSchema } from "@/config/schema"
import { createAddressLabel } from "@/lib/app/label"
import { useToast } from "@/lib/hooks/use-toast"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function TooltipHover({ name, content }: { name: string; content: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm"
      >
        {name}
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}

export function DashboardSubmitSoloAddress({ userId }: { userId: string }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof addressLabelSchema>>({
    resolver: zodResolver(addressLabelSchema),
    defaultValues: {
      blockchain: "",
      address: "",
      addressName: "",
      labelType: "",
      labelSubType: "",
      label: "",
    },
  })

  async function onSubmit(values: z.infer<typeof addressLabelSchema>) {
    setLoading(true)
    console.log(values)
    try {
      await createAddressLabel(values, userId)
      form.reset()
      toast({
        title: "Label created successfully",
      })
    } catch (error) {
      toast({
        title: "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="blockchain"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <TooltipHover
                    name="Chain"
                    content="Name of the blockchain network"
                  />

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a chain for the wallet label" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {chains.map((chain) => (
                        <SelectItem key={chain.id} value={chain.id}>
                          {chain.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="lg:flex lg:space-x-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="lg:w-2/3">
                <FormControl>
                  <div className="mt-2 flex rounded-md shadow-sm">
                    <TooltipHover
                      name="Address"
                      content="Blockchain address being labeled"
                    />

                    <input
                      type="text"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0x..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressName"
            render={({ field }) => (
              <FormItem className="lg:w-1/3">
                <FormControl>
                  <div className="mt-2 flex rounded-md shadow-sm">
                    <TooltipHover
                      name="Address Name"
                      content="Blockchain address being labeled"
                    />

                    <input
                      type="text"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="e.g., MEV"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <TooltipHover
                    name="Label"
                    content="Concise label or tag for the address."
                  />

                  <input
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="e.g., 'Uniswap'"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="labelType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <TooltipHover
                    name="Label Type"
                    content="Broad category of the label"
                  />

                  <input
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="e.g., 'token'"
                    {...field}
                  />
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
                <div className="mt-2 flex rounded-md shadow-sm">
                  <TooltipHover
                    name="Label Sub-type"
                    content="Specific categorization under the label type."
                  />

                  <input
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="e.g., 'ERC20'"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />
        <Button type="submit" disabled={loading}>
          {loading && <Icons.loading className="mr-2 size-4 animate-spin" />}
          Submit label
        </Button>
      </form>
    </Form>
  )
}
