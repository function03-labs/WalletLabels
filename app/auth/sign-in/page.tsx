"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Github, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"

import { useToast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboardnew"
  const [isLoading, setIsLoading] = useState<{
    email: boolean
    github: boolean
  }>({
    email: false,
    github: false,
  })

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading((prev) => ({ ...prev, email: true }))

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        toast({
          title: "Error",
          description: "Failed to send sign in link",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Check your email",
        description: "A sign in link has been sent to your email address.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, email: false }))
    }
  }

  const handleGitHubSignIn = async () => {
    setIsLoading((prev) => ({ ...prev, github: true }))
    try {
      await signIn("github", { callbackUrl })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with GitHub",
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, github: false }))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <Card className="w-full max-w-md border-white/10 bg-black/50 p-8 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your API dashboard
          </p>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              placeholder="you@example.com"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading.email}
            className="relative w-full overflow-hidden bg-blue-500 text-white transition-colors hover:bg-blue-600"
          >
            {isLoading.email ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <>
                Sign in with Email
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isLoading.github}
            className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={handleGitHubSignIn}
          >
            {isLoading.github ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Github className="mr-2 size-4" />
            )}
            GitHub
          </Button>

          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/sign-up")}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </button>
          </p>
        </form>
      </Card>
    </div>
  )
}
