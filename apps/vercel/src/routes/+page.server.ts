import type { PageServerLoad } from './$types'

import { graphql } from '$lib/__generated__/gql'
import { client } from '$lib/github'

const a = graphql(`
  query GetDeployments($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      deployments(last: 30) {
        edges {
          node {
            id
            state
            latestEnvironment
            ref {
              name
            }
            commit {
              abbreviatedOid
              oid
              committedDate
              message
              author {
                avatarUrl
                name
              }
            }
            updatedAt
            task
          }
        }
      }
    }
  }
`)

export const load: PageServerLoad = async () => {
  const result = await client.query(a, {
    owner: 'elysium-everlasting',
    name: 'demo',
  })

  return {
    repository: result.data?.repository,
  }
}
