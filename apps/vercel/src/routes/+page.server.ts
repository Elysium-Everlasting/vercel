import type { PageServerLoad } from './$types'

import { graphql } from '$lib/__generated__/gql'
import { client } from '$lib/github'
import { notNull } from '$lib/utils'

const deploymentsQuery = graphql(`
  query GetDeployments($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      deployments(last: 30, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            id
            state
            latestEnvironment
            ref {
              name
            }
            latestStatus {
              environmentUrl
              logUrl
            }
            commit {
              abbreviatedOid
              oid
              committedDate
              message
              commitUrl
              author {
                avatarUrl
                name
              }
              treeResourcePath
              tree {
                commitResourcePath
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

function timeBetween(date1: Date, date2 = new Date()) {
  const diff = date2.getTime() - date1.getTime()

  if (diff < 1000 * 60) {
    return `${Math.floor(diff / 1000)} seconds ago`
  }

  if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))} minutes ago`
  }

  if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))} hours ago`
  }

  return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days ago`
}

export const load: PageServerLoad = async () => {
  const owner = 'elysium-everlasting'
  const name = 'demo'

  const deploymentsResult = await client.query(deploymentsQuery, { owner, name })

  const deployments =
    deploymentsResult.data?.repository?.deployments?.edges
      ?.map((edge) => edge?.node)
      .filter(notNull)
      .map((node) => {
        return {
          ...node,
          /**
           * @example "2 days ago"
           */
          lastUpdatedRelative: timeBetween(new Date(node.updatedAt)),
          treeUrl: `https://github.com/${node.commit?.treeResourcePath}`,
        }
      }) ?? []

  const repository = {
    deployments,
  }

  return {
    repository,
  }
}
