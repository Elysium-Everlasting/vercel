import { graphql } from '$lib/__generated__/gql'
import { client } from '$lib/github'

export const userQuery = graphql(`
  query GetUser($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      email
    }
  }
`)

export async function getUser(login: string) {
  const userResult = await client.query(userQuery, { login })

  const user = {
    ...userResult.data?.user,
    avatarUrl: userResult.data?.user?.avatarUrl,
    login: userResult.data?.user?.login,
    email: userResult.data?.user?.email,
  }

  return user
}
