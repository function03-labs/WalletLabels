"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"
import { useSession } from "next-auth/react"

import { useToast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session, update: updateSession } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        company: formData.get("company") as string,
      }

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      await updateSession()
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your account settings</p>
      </div>

      {/* Profile Settings */}
      <Card className="border-white/10 bg-black/50 p-6">
        <div className="mb-6 flex items-center gap-4">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Profile"}
              className="size-16 rounded-full border-2 border-white/10"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-full border-2 border-white/10 bg-blue-500/10">
              <User className="size-8 text-blue-400" />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-white">Profile</h2>
            <p className="text-sm text-gray-400">
              Update your personal information
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={session?.user?.name || ""}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={session?.user?.email || ""}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-white"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              defaultValue={session?.user?.company || ""}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>

      {/* API Settings */}
      <Card className="border-white/10 bg-black/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">API Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Rate Limiting
            </label>
            <select
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              defaultValue="5000"
            >
              <option value="1000">1,000 requests/day</option>
              <option value="5000">5,000 requests/day</option>
              <option value="10000">10,000 requests/day</option>
              <option value="50000">50,000 requests/day</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Webhook URL
            </label>
            <input
              type="url"
              placeholder="https://your-domain.com/webhook"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/10 bg-black/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-red-400">Danger Zone</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-white">Delete Account</h3>
            <p className="mb-4 text-sm text-gray-400">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button
              variant="destructive"
              className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
