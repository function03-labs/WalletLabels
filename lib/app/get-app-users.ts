import type { Users } from "@/app/api/app/users/route"

export async function getAppUsers() {
  try {
    const response = await fetch("/api/app/users")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: {
      object: "Users"
      users: Users
    } = await response.json()
    return data
  } catch (error) {
    throw new Error("Something went wrong")
  }
}