import http from 'http'

import { createNodeMiddleware } from '@octokit/webhooks'
import dotenv from 'dotenv'
import { Octokit, App } from 'octokit'

dotenv.config({ path: '../../.env' })

async function main() {
  const appId = process.env['APP_ID'] ?? ''
  const privateKey = process.env['PRIVATE_KEY_PATH'] ?? ''
  const secret = process.env['WEBHOOK_SECRET'] ?? ''
  const enterpriseHostname = process.env['ENTERPRISE_HOSTNAME']

  const app = new App({
    appId,
    privateKey,
    webhooks: {
      secret,
    },
    ...(enterpriseHostname && {
      Octokit: Octokit.defaults({
        baseUrl: `https://${enterpriseHostname}/api/v3`,
      }),
    }),
  })

  const { data } = await app.octokit.request('/app')

  app.octokit.log.debug(`Authenticated as '${data.name}'`)

  app.webhooks.on('push', async ({ payload }) => {
    const { ref, repository } = payload
    const owner = repository.owner.login
    const repo = repository.name

    console.log(`Received push event for ${owner}/${repo}@${ref}`)
  })

  // Subscribe to the "pull_request.opened" webhook event
  app.webhooks.on('pull_request.opened', async ({ octokit, payload }) => {
    console.log(`Received a pull request event for #${payload.pull_request.number}`)
    try {
      await octokit.rest.issues.createComment({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.pull_request.number,
        body: 'HELLO',
      })
    } catch (error) {
      if (error.response) {
        console.error(
          `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`,
        )
      } else {
        console.error(error)
      }
    }
  })

  // Launch a web server to listen for GitHub webhooks
  const port = process.env['PORT'] || 3000
  const path = '/api/webhook'
  const localWebhookUrl = `http://localhost:${port}${path}`

  // See https://github.com/octokit/webhooks.js/#createnodemiddleware for all options
  const middleware = createNodeMiddleware(app.webhooks, { path })

  http.createServer(middleware).listen(port, () => {
    console.log(`Server is listening for events at: ${localWebhookUrl}`)
    console.log('Press Ctrl + C to quit.')
  })
}

main()
