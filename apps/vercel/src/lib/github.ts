import { createAppAuth } from '@octokit/auth-app'
import { App, Octokit } from 'octokit'

import { APP_ID, CLIENT_ID, CLIENT_SECRET, PRIVATE_KEY, WEBHOOK_SECRET } from '$env/static/private'

export const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
  webhooks: {
    secret: WEBHOOK_SECRET,
  },
})

export const octokit = new Octokit()

export const auth = createAppAuth({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})

const appAuthentication = await auth({ type: 'app' })

octokit.request.defaults({
  headers: {
    authentication: `token ${appAuthentication.token}`,
  },
})
