"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ApiKey } from "@prisma/client"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { TableApiKeysSchema } from "@/config/schema"
import { updateApiKey } from "@/lib/app/api-key"
import { useToast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function UpdateAPIKeyName({ apiKey }: { apiKey: ApiKey }) {
  const router = useRouter()
  const { toast } = useToast()
  const [inputFocused, setInputFocused] = useState(false)

  const form = useForm<z.infer<typeof TableApiKeysSchema>>({
    resolver: zodResolver(TableApiKeysSchema),
    defaultValues: {
      name: apiKey.name,
    },
  })

  async function onSubmit(values: z.infer<typeof TableApiKeysSchema>) {
    try {
      await updateApiKey(
        {
          ...values,
          id: apiKey.id,
          value: apiKey.key,
          chains: apiKey.chains,
        },
        apiKey.userId
      )
      toast({ title: "API Key name updated" })
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-sm items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-[100px]">
              <FormControl>
                <Input
                  {...field}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setTimeout(() => setInputFocused(false), 250)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {inputFocused && (
          <Button size="icon" type="submit" variant={"secondary"}>
            <Check className="size-5" />
          </Button>
        )}
      </form>
    </Form>
  )
}
