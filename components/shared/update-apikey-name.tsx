"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ApiKey } from "@prisma/client"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { TableApiKeysSchema } from "@/config/schema"
import { updateApiKey } from "@/lib/app/api-key"

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
          key: apiKey.key,
          chains: apiKey.chains,
        },
        apiKey.userId
      )
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="icon" type="submit" variant={"secondary"}>
          <Check className="size-5" />
        </Button>
      </form>
    </Form>
  )
}
