import { createAppAuth } from '@octokit/auth-app'
import { Client, fetchExchange } from '@urql/core'
import { App, Octokit } from 'octokit'

import { APP_ID, PRIVATE_KEY, WEBHOOK_SECRET } from '$env/static/private'

export const auth = createAppAuth({ appId: APP_ID, privateKey: PRIVATE_KEY })

export const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
  webhooks: {
    secret: WEBHOOK_SECRET,
  },
})

export const appAuthentication = await auth({ type: 'app' })

export const octokit = new Octokit()

export const token = await octokit
  .request('GET /app/installations', {
    headers: {
      authorization: `Bearer ${appAuthentication.token}`,
    },
  })
  .then(async (response) => {
    return octokit
      .request('POST /app/installations/{installation_id}/access_tokens', {
        installation_id: response.data[0].id,
        headers: {
          authorization: `Bearer ${appAuthentication.token}`,
        },
      })
      .then((response) => {
        return response.data.token
      })
  })

export const r = octokit.request.defaults({
  headers: {
    authorization: `Bearer ${token}`,
  },
})

export const g = octokit.graphql.defaults({
  headers: {
    authorization: `Bearer ${token}`,
  },
})

export const client = new Client({
  url: 'https://api.github.com/graphql',
  exchanges: [fetchExchange],
  fetchOptions: () => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  },
})
