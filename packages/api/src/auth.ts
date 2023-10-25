import type { CreateNextContextOptions } from '@trpc/server/adapters/next'

export type Session = {
  user: {
    id: number
  }
}

const getSession = async ({
  req,
}: CreateNextContextOptions): Promise<Session> => {
  return {
    user: {
      id: 1,
    },
  }
}

export const getServerAuthSession = async ({
  req,
  res,
}: CreateNextContextOptions) => {
  const session = await getSession({
    req,
    res,
  })

  if (session) {
    return session
  }

  return null
}
