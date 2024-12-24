"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Github, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"

import { toast, useToast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SignUpPage() {
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

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading((prev) => ({ ...prev, email: true }))

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const company = formData.get("company") as string

    try {
      // Create user first
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`.trim(),
          company,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create account")
      }

      // Send sign in link
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
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, email: false }))
    }
  }

  const handleGitHubSignUp = async () => {
    setIsLoading((prev) => ({ ...prev, github: true }))
    try {
      await signIn("github", { callbackUrl })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign up with GitHub",
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
          <h1 className="mb-2 text-2xl font-bold text-white">
            Create your account
          </h1>
          <p className="text-sm text-gray-400">
            Get started with our API services
          </p>
        </div>

        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                placeholder="John"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white"
            >
              Work email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-white"
            >
              Company name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              placeholder="Optional"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500/50"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
              I agree to the{" "}
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300"
              >
                Privacy Policy
              </button>
            </label>
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
                Create Account with Email
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
            onClick={handleGitHubSignUp}
          >
            {isLoading.github ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Github className="mr-2 size-4" />
            )}
            GitHub
          </Button>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/sign-in")}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign in
            </button>
          </p>
        </form>
      </Card>
    </div>
  )
}
