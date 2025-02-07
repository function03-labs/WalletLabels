"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

export function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
  const {
    data: user,
    refetch: mutateUser,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/app/user").then((res) => res.json()),
    staleTime: 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    refetchOnReconnect: true,
    enabled: true,
  })

  const Router = useRouter()

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user || isLoading) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return {
    user,
    mutateUser,
    isLoading: Boolean(isLoading || isFetching)
  }
}