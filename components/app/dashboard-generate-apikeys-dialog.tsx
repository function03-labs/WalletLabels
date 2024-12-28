"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ApiKey, Subscription, User } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ApiKeySchema } from "@/config/schema"
import { createApiKey } from "@/lib/app/api-key"
import { useToast } from "@/lib/hooks/use-toast"

import { DashboardCopyAPIKey } from "@/components/app/dashboard-copy-apikey"
import { Icons } from "@/components/shared/icons"
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

const planToApiKeyLimit: Record<number, number> = {
  0: 0, // Free
  1: 3, // Basic Monthly
  2: 3, // Basic Bi-Annually
  3: 3, // Basic Annually
  4: 5, // Pro Monthly
  5: 5, // Pro Bi-Annually
  6: 5, // Pro Annually
  7: 25, // Enterprise
}

export function DashboardGenerateAPIkeysDialog({
  user,
  apiKeysCount,
  subscription,
}: {
  apiKeysCount: number
  user: User
  subscription: Subscription
}) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [generatedKey, setGeneratedKey] = useState<ApiKey | undefined>()
  const form = useForm<z.infer<typeof ApiKeySchema>>({
    resolver: zodResolver(ApiKeySchema),
    defaultValues: {
      name: "",
    },
  })
  const apiKeyLimit = planToApiKeyLimit[subscription.planId]

  async function onSubmit(values: z.infer<typeof ApiKeySchema>) {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!user.email) {
        throw new Error("User email is required")
      }

      const newKey = await createApiKey(
        {
          name: values.name,
        },
        user.id,
        user.email
      )
      setGeneratedKey(newKey)
      router.refresh()
      toast({
        description: "Your API Key is being Generated!",
      })
    } catch (error) {
      console.error("Error generating API key:", error)
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
      <div className="flex justify-start">
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              if (generatedKey) {
                setGeneratedKey(undefined)
                form.reset()
              }

              if (apiKeysCount >= apiKeyLimit) {
                toast({
                  title: `You cannot create more than ${apiKeyLimit} API keys.`,
                  variant: "destructive",
                })
              }

              if (!user.organizationSlug || user.organizationSlug === "") {
                toast({
                  variant: "destructive",
                  title: "You need to create an organization first!",
                  description: (
                    <div>
                      Go to{" "}
                      <Link
                        href="/dashboard/profile"
                        className="pr-0.5 underline"
                      >
                        profile
                      </Link>{" "}
                      and fill your details.
                    </div>
                  ),
                })
              }
            }}
            className="mx-auto space-x-2 font-bold sm:mx-0"
          >
            <Icons.addCircle /> <span className="">Generate API Key</span>
          </Button>
        </DialogTrigger>
      </div>

      {generatedKey && <DashboardCopyAPIKey apiKey={generatedKey} />}

      {!generatedKey && apiKeysCount < apiKeyLimit && user.organizationSlug && (
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
