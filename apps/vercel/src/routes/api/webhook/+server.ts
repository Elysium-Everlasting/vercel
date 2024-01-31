import type { EmitterWebhookEventName } from '@octokit/webhooks'

import type { RequestHandler } from './$types'

import { app, octokitRequest, token } from '$lib/github'

app.webhooks.on('push', async ({ payload }) => {
  const workflowResponse = await octokitRequest(
    'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
    {
      owner: 'elysium-everlasting',
      repo: 'vercel',
      workflow_id: '.github/workflows/hello.yml',
      ref: 'main',
      inputs: {
        TOKEN: token,
        owner: payload.repository.owner.name,
        repo: payload.repository.name,
        ref: payload.ref,
        environment: 'preview',
        environment_url: 'https://github.com',
      },
    },
  )

  console.log(workflowResponse)
})

export const POST: RequestHandler = async (event) => {
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
