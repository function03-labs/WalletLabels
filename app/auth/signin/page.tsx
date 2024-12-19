"use client"

import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4 p-4">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const email = (e.target as any).email.value
            signIn("email", { email, callbackUrl: "/" })
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded border p-2"
          />
          <button
            type="submit"
            className="mt-2 w-full rounded bg-blue-500 p-2 text-white"
          >
            Sign in with Email
          </button>
        </form>
      </div>
    </div>
  )
}
