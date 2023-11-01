import * as mocks from '@common/mocks'

export const getSubscription = async ({ slug }: { slug?: string | null }) => {
  if (!slug) {
    throw new Error('Slug is required')
  }

  const subscription = mocks.getSubscription(slug)

  if (!subscription) {
    throw new Error('Subscription not found')
  }

  return { subscription }
}
