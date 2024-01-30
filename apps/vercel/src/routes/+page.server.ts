import { Client, cacheExchange, fetchExchange } from '@urql/core'

import type { PageServerLoad } from './$types'

import { graphql } from '$lib/__generated__/gql'
import { token } from '$lib/github'

const a = graphql(`
  query GetDeployments($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(last: 20, states: CLOSED) {
        edges {
          node {
            title
            url
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`)

export const load: PageServerLoad = async (event) => {
  const client = new Client({
    url: 'https://api.github.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetch: event.fetch,
    fetchOptions: () => {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    },
  })

  const result = await client.query(a, {
    owner: 'elysium-everlasting',
    name: 'demo',
  })

  console.log('result: ', result)

  return {
    deployments: [],
  }
}
