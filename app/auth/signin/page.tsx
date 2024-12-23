"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { siteConfig } from "@/config/site"
import { useToast } from "@/lib/hooks/use-toast"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FloatingLabel } from "@/components/ui/floating-label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const labels = [
  { text: "ChainAdmin", icon: "shield", color: "#FF6B6B" },
  { text: "CeFi Exchange", icon: "building", color: "#4ECDC4" },
  { text: "NFT Tokens", icon: "image", color: "#45B7D1" },
  {
    text: "ChainAdmin",
    icon: "Shield",
    color: "#FF6B6B",
    category: "ChainAdmin",
  },
  {
    text: "CeFi Exchange",
    icon: "Building2",
    color: "#4ECDC4",
    category: "CeFiEx",
  },
  {
    text: "NFT Tokens",
    icon: "Image",
    color: "#45B7D1",
    category: "UniqueTokens",
  },
  {
    text: "DeFi Apps",
    icon: "Workflow",
    color: "#96CEB4",
    category: "FinDApps",
  },
  {
    text: "Bridge",
    icon: "Link",
    color: "#FF8C42",
    category: "InteropBridges",
  },
  { text: "DEX", icon: "ArrowLeftRight", color: "#D4A5A5", category: "DeEx" },
  { text: "GameFi", icon: "Gamepad2", color: "#9B5DE5", category: "GameFi" },
  { text: "Tokens", icon: "Coins", color: "#00BBF9", category: "CryptoTokens" },
  { text: "dApps", icon: "LayoutGrid", color: "#F15BB5", category: "DecApps" },
  { text: "Network", icon: "Network", color: "#FEE440", category: "NetOps" },
  { text: "Treasury", icon: "Wallet", color: "#2EC4B6", category: "treasury" },
  {
    text: "Mining Pool",
    icon: "Pickaxe",
    color: "#FF9F1C",
    category: "mining_pool",
  },
  {
    text: "Governance",
    icon: "GanttChartSquare",
    color: "#E71D36",
    category: "governance",
  },
  { text: "Oracle", icon: "Eye", color: "#3A86FF", category: "oracle" },
  { text: "DAO", icon: "Users", color: "#260257FF", category: "dao" },
  {
    text: "Staking",
    icon: "LockKeyhole",
    color: "#FB5607",
    category: "staking_contract",
  },
  {
    text: "NFT Market",
    icon: "Store",
    color: "#FF006E",
    category: "marketplace",
  },
  { text: "Bridge", icon: "Link", color: "#3A86FF", category: "bridge" },
  {
    text: "Hot Wallet",
    icon: "Flame",
    color: "#FF0000",
    category: "hot_wallet",
  },
  {
    text: "Cold Wallet",
    icon: "Snowflake",
    color: "#0096C7",
    category: "cold_wallet",
  },
  { text: "ChainAdmin", icon: "shield", color: "#FF6B6B" },
  { text: "CeFi Exchange", icon: "building", color: "#0B4743FF" },
  { text: "NFT Tokens", icon: "image", color: "#45B7D1" },
  {
    text: "ChainAdmin",
    icon: "Shield",
    color: "#FF6B6B",
    category: "ChainAdmin",
  },
  {
    text: "CeFi Exchange",
    icon: "Building2",
    color: "#4ECDC4",
    category: "CeFiEx",
  },
  {
    text: "NFT Tokens",
    icon: "image",
    color: "#C15C95FF",
    category: "UniqueTokens",
  },
  {
    text: "DeFi Apps",
    icon: "Workflow",
    color: "#96CEB4",
    category: "FinDApps",
  },
  {
    text: "Bridge",
    icon: "Link",
    color: "#080808FF",
    category: "InteropBridges",
  },
  { text: "DEX", icon: "ArrowLeftRight", color: "#D4A5A5", category: "DeEx" },
  { text: "GameFi", icon: "Gamepad2", color: "#9B5DE5", category: "GameFi" },
  { text: "Tokens", icon: "Coins", color: "#00BBF9", category: "CryptoTokens" },
  { text: "dApps", icon: "LayoutGrid", color: "#F15BB5", category: "DecApps" },
  { text: "Network", icon: "Network", color: "#413D21FF", category: "NetOps" },
  {
    text: "Treasury",
    icon: "Wallet",
    color: "#9F693DFF",
    category: "treasury",
  },
  {
    text: "Mining Pool",
    icon: "Pickaxe",
    color: "#FF9F1C",
    category: "mining_pool",
  },
  {
    text: "Governance",
    icon: "GanttChartSquare",
    color: "#E71D36",
    category: "governance",
  },
  { text: "Oracle", icon: "Eye", color: "#3A86FF", category: "oracle" },
  { text: "DAO", icon: "Users", color: "#8338EC", category: "dao" },
  {
    text: "Staking",
    icon: "LockKeyhole",
    color: "#FB5607",
    category: "staking_contract",
  },
  { text: "Bridge", icon: "Link", color: "#3A86FF", category: "bridge" },
  {
    text: "Hot Wallet",
    icon: "Flame",
    color: "#FF0000",
    category: "hot_wallet",
  },
  {
    text: "Cold Wallet",
    icon: "Snowflake",
    color: "#0096C7",
    category: "cold_wallet",
  },
]

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false)
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEmailLoading(true)
    try {
      const result = await signIn("email", {
        email: values.email,
        redirect: false,
        callbackUrl: searchParams?.get("callbackUrl") || "/dashboard",
      })
      if (result?.error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Check your email",
          description: "A sign in link has been sent to your email address.",
        })
        router.push("/auth/verify-request")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true)
    try {
      await signIn("github", {
        callbackUrl: searchParams?.get("callbackUrl") || "/dashboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong with GitHub sign in.",
        variant: "destructive",
      })
      setIsGithubLoading(false)
    }
  }

  return (
    <div className="container relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="fixed inset-0 scale-125 overflow-hidden">
        {labels.map((label, index) => (
          <FloatingLabel
            key={index}
            text={label.text}
            icon={label.icon as keyof typeof Icons}
            color={label.color}
            speed={Math.random() * 15 + 50}
            delay={0}
          />
        ))}
      </div>

      <Card className="relative w-full max-w-[350px] bg-background/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="mx-auto mb-4 flex h-16 w-auto items-center gap-2">
            <Icons.logo className="size-8" />
            <span className="whitespace-nowrap text-2xl font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </div>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            onClick={handleGithubSignIn}
            disabled={isGithubLoading}
          >
            {isGithubLoading ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Github className="mr-2 size-4" />
            )}
            GitHub
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        type="email"
                        disabled={isEmailLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isEmailLoading}
              >
                {isEmailLoading && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Sign in with Email
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
