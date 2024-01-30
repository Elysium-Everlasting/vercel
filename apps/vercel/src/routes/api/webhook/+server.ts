import type { RequestHandler } from './$types'

export const POST: RequestHandler = async () => {
  console.log('Received a webhook request!')
  return new Response('Hello from the webhook server!')
}
