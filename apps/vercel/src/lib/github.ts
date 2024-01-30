import { App } from 'octokit'

import { APP_ID, PRIVATE_KEY, WEBHOOK_SECRET } from '$env/static/private'

export const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
  webhooks: {
    secret: WEBHOOK_SECRET,
  },
})
