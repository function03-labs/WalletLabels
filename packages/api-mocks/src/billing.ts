import { getSubscription as getMockSubscription } from './mock-data'

export const getSubscription = async ({ slug }: { slug?: string | null }) => {
  if (!slug) {
    throw new Error('Slug is required')
  }

  const subscription = getMockSubscription(slug)

  if (!subscription) {
    throw new Error('Subscription not found')
  }

  return { subscription }
}
