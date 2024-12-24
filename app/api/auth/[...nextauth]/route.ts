import NextAuth, { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { env } from "@/env.mjs"
import { prisma } from "@/lib/prisma"

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken?: string
  }
}
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: env.SENDGRID_API_KEY,
        },
      },
      from: env.SENDGRID_FROM_EMAIL,
      maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/sign-up", // Redirect new users here
  },
  callbacks: {
    async signIn({ user, account, email }) {
      // Always allow OAuth sign-ins
      if (account?.provider === "github") {
        return true
      }

      // For email sign-ins, check if user exists
      const userExists = await prisma.user.findUnique({
        where: { email: user.email || email?.email },
      })

      if (userExists) {
        return true // Send magic link if user exists
      }

      return "/auth/sign-up" // Redirect to sign-up if user doesn't exist
    },
    async jwt({ token, user, account }) {
      // Add the user id to the token right after sign in
      if (user) {
        token.sub = user.id
        token.accessToken = account?.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Add the user id from token to the session
      if (token && session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

