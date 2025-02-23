"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { updateUser } from "@/lib/app/user-profile"
import { useToast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  organizationSlug: z.string().optional(),
})

export function AppAccountForm({ user }: { user: User }) {
  const [isLoading, startTransition] = useTransition()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      organizationSlug: user.organizationSlug || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await updateUser(user.id, values)
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Form {...form} data-oid="syvjf7w">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        data-oid="w-54lig"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem data-oid="6c47ym7">
              <FormLabel data-oid="b8gp7yq">
                Name
                <span className="text-red-500" data-oid="is7l3v3">
                  *
                </span>
              </FormLabel>
              <FormControl data-oid="rg:rfhf">
                <Input
                  placeholder="John Doe"
                  {...field}
                  required
                  data-oid="lu0y08s"
                />
              </FormControl>
              <FormDescription data-oid="2qcxsry">
                This is your display name.
              </FormDescription>
              <FormMessage data-oid="yhn0pm-" />
            </FormItem>
          )}
          data-oid="21235:b"
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem data-oid="1dnc7ej">
              <FormLabel data-oid="x4aya82">
                Email
                <span className="text-red-500" data-oid="a4n71v0">
                  *
                </span>
              </FormLabel>
              <FormControl data-oid="s5rceto">
                <Input
                  placeholder="example@email.com"
                  {...field}
                  required
                  data-oid="_s:nfuc"
                />
              </FormControl>
              <FormDescription data-oid="3.k.o0-">
                Your email address is required.
              </FormDescription>
              <FormMessage data-oid="ctnjabn" />
            </FormItem>
          )}
          data-oid="aombxsv"
        />

        <FormField
          control={form.control}
          name="organizationSlug"
          render={({ field }) => (
            <FormItem data-oid="wftt.t1">
              <FormLabel data-oid="sak.ieo">Organization</FormLabel>
              <FormControl data-oid="opw:7mu">
                <Input placeholder="function03" {...field} data-oid="4aplj14" />
              </FormControl>
              <FormDescription data-oid="9b0-fg3">
                This is your organization slug.
              </FormDescription>
              <FormMessage data-oid="fz2ihtn" />
            </FormItem>
          )}
          data-oid="b.8uo1h"
        />

        <Button type="submit" disabled={isLoading} data-oid="ernsp5p">
          {isLoading && (
            <Loader2 className="mr-2 size-4 animate-spin" data-oid="7a6s3o-" />
          )}{" "}
          Update
        </Button>
      </form>
    </Form>
  )
}
