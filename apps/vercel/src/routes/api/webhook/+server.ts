import type { EmitterWebhookEventName } from '@octokit/webhooks'

import type { RequestHandler } from './$types'

import { app, octokitRequest, token } from '$lib/github'
import { prisma } from '$lib/prisma'

const owner = 'elysium-everlasting'
const repo = 'vercel'
const workflowId = '.github/workflows/hello.yml'

app.webhooks.on('push', async ({ id, name, payload }) => {
  console.log('SOMEBODY PUSHED', { id, name, payload })

  const workflowResponse = await octokitRequest(
    'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
    {
      owner,
      repo,
      workflow_id: workflowId,
      ref: 'main',
      inputs: {
        TOKEN: token,
        repo: payload.repository.name,
        owner: payload.repository.owner.name,
      },
    },
  )

  console.log(workflowResponse)
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
