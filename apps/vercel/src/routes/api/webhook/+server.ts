import type { EmitterWebhookEventName } from '@octokit/webhooks'

import type { RequestHandler } from './$types'

import { app } from '$lib/github'
import { prisma } from '$lib/prisma'

app.webhooks.on('push', async ({ id, name, payload }) => {
  console.log('PUSHED', { id, name, payload })
})

export const POST: RequestHandler = async (event) => {
  console.log('trying to read prisma')

  console.log('users: ', await prisma.user.findMany())

  const id = event.request.headers.get('X-Github-Delivery') ?? ''
  const name = event.request.headers.get('X-Github-Event') as EmitterWebhookEventName
  const signature = event.request.headers.get('x-hub-signature-256') ?? ''
  const payload = await event.request.text()

  try {
    await app.webhooks.verifyAndReceive({ id, name, payload, signature })
    return new Response('OK')
  } catch (error) {
    return new Response('Error', { status: 500 })
  }
}
