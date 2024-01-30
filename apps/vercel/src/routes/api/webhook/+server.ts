import { App } from 'octokit'

import type { RequestHandler } from './$types'

import { APP_ID, PRIVATE_KEY, WEBHOOK_SECRET } from '$env/static/private'

export const POST: RequestHandler = async () => {
  console.log('Received a webhook request!')

  console.log({
    APP_ID,
    PRIVATE_KEY,
    WEBHOOK_SECRET,
  })

  const app = new App({
    appId: APP_ID,
    privateKey: PRIVATE_KEY,
    webhooks: {
      secret: WEBHOOK_SECRET,
    },
  })

  console.log('App created!', app)

  return new Response('Hello from the webhook server!')
}
