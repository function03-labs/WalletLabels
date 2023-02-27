import { client } from './client'
import { graphql } from './gql'
import { GetSubscriptionQueryVariables } from './gql/graphql'

const GetSubscriptionQuery = graphql(`
  query GetSubscription($slug: String!) {
    subscription(slug: $slug) {
      id
      plan
      status
      startedAt
      trialEndsAt
      createdAt
      updatedAt
    }
  }
`)

export const getSubscription = async (
  variables: GetSubscriptionQueryVariables,
) => {
  return client.request(GetSubscriptionQuery, variables)
}
