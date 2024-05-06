"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ApiKey } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { chains } from "@/config/blockchain-networks"
import { ApiKeySchema } from "@/config/schema"
import { createApiKey } from "@/lib/app/api-key"
import { generateIds } from "@/lib/utils/index"

import { DashboardCopyAPIKey } from "@/components/app/dashboard-copy-apikey"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select"
import { useToast } from "@/components/ui/use-toast"

export function DashboardGenerateAPIkeysDialog({
  userId,
  apiKeysCount,
}: {
  apiKeysCount: number
  userId: string
}) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [generatedKey, setGeneratedKey] = useState<ApiKey | undefined>()

  const form = useForm<z.infer<typeof ApiKeySchema>>({
    resolver: zodResolver(ApiKeySchema),
    defaultValues: {
      name: "",
      chain: [],
    },
  })

  async function onSubmit(values: z.infer<typeof ApiKeySchema>) {
    setIsLoading(true)

    try {
      const { id, key } = generateIds()
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newKey = await createApiKey(
        {
          id,
          key,
          name: values.name,
          chains: values.chain,
        },
        userId
      )
      setGeneratedKey(newKey)
      router.refresh()
      toast({
        description: "Your API Key is being Generated!",
      })
    } catch (error) {
      console.log("Error generating API key:", error)
      toast({
        variant: "destructive",
        title: "Error generating API key",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              if (generatedKey) {
                setGeneratedKey(undefined)
                form.reset()
              }

              if (apiKeysCount >= 3) {
                toast({
                  title: "You cannot create more than 3 API keys.",
                  variant: "destructive",
                })
              }
            }}
            className="ml-auto"
          >
            New API Key
          </Button>
        </DialogTrigger>
      </div>

      {generatedKey && <DashboardCopyAPIKey apiKey={generatedKey} />}

      {!generatedKey && apiKeysCount < 3 && (
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle className="dark:text-white">
                  Generate API Key
                </DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">API Name</FormLabel>
                    <FormControl>
                      <div className="mb-4 dark:text-white">
                        <Input
                          {...field}
                          placeholder="Enter a name for the API Key"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Chains</FormLabel>
                    <FormControl>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select Chains" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {chains.map((chain) => (
                              <MultiSelectorItem
                                key={chain.value}
                                value={chain.value}
                              >
                                <div className="flex items-center space-x-2">
                                  <Image
                                    src={chain.iconUrl}
                                    alt={chain.label}
                                    width={32}
                                    height={32}
                                    className="size-8 rounded-full"
                                  />
                                  <span>{chain.label}</span>
                                </div>
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {isLoading && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}{" "}
                  Generate
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  )
}
