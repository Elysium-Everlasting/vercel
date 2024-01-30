import type { EmitterWebhookEventName } from '@octokit/webhooks'
import { App } from 'octokit'

import type { RequestHandler } from './$types'

import { APP_ID, PRIVATE_KEY, WEBHOOK_SECRET } from '$env/static/private'

export const POST: RequestHandler = async (event) => {
  console.log('HANDLING WEBHOOK')

  const app = new App({
    appId: APP_ID,
    privateKey: PRIVATE_KEY,
    webhooks: {
      secret: WEBHOOK_SECRET,
    },
  })

  const id = event.request.headers.get('x-github-delivery') ?? ''
  const name = event.request.headers.get('x-github-event') as EmitterWebhookEventName
  const signatureSHA256 = event.request.headers.get('x-hub-signature-256') ?? ''
  const payload = await event.request.text()

  console.log({
    id,
    name,
    signatureSHA256,
    payload,
  })

  await app.webhooks.verifyAndReceive({
    id: id,
    name,
    payload,
    signature: signatureSHA256,
  })

  console.log('DONE HANDLING WEBHOOK')

  return new Response('Hello from the webhook server!')
}
