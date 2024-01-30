import type { PageServerLoad } from './$types'

import { graphql } from '$lib/__generated__/gql'
import { octokit } from '$lib/github'

const a = graphql(/* GraphQL */ `
  query WHY() {
    repository(owner:"octocat", name:"Hello-World") {
      issues(last:20, states:CLOSED) {
      }
    }
  }
`)

console.log(a)

export const load: PageServerLoad = async () => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/deployments', {
    owner: 'elysium-everlasting',
    repo: 'demo',
  })

  return {
    deployments: response.data,
  }
}
