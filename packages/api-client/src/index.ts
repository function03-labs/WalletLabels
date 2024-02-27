/**
 * The API client is a wrapper around the API implementation and allows us to easily switch between different API implementations.
 *
 * For example, the demo app uses @api/demo-client by default. Which returns mocked/fake data and is useful for testing and
 * development and is used in the demo application.
 *
 * The export could be your own api client, eg @api/graphql-client or @api/supabase-client.
 */


// api-client.ts

import fetch from 'node-fetch'

export const inviteToOrganization = async ({ emails, organizationId }) => {

  const body = JSON.stringify({ emails, organizationId })

  const res = await fetch(
    `/api/organizations/invite`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body 
    }
  )

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message) 
  }

  const data = await res.json()
  console.log(data)
  return data

}

export * from '@api/demo-client'
