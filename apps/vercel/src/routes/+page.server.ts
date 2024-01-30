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
            ref {
              name
            }
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

  console.log('result: ', JSON.stringify(result.data?.repository, null, 2))

  return {
    deployments: [],
  }
}
