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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} required />
              </FormControl>
              <FormDescription>This is your display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} required />
              </FormControl>
              <FormDescription>Your email address is required.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizationSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <FormControl>
                <Input placeholder="function03" {...field} />
              </FormControl>
              <FormDescription>This is your organization slug.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />} Update
        </Button>
      </form>
    </Form>
  )
}
