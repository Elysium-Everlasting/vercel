// @ts-check

import core from '@actions/core'
import github from '@actions/github'

const DEPLOYMENT_ID_OUTPUT_KEY = 'deployment_id'

async function main() {
  const token = core.getInput('TOKEN')
  const repo = core.getInput('repo')
  const owner = core.getInput('owner')
  const ref = core.getInput('ref')
  const environment = core.getInput('environment')
  const url = core.getInput('url')
  const state: any = core.getInput('status')

  const deploymentIdInput = core.getInput('deployment_id')

  let deploymentId = deploymentIdInput ? parseInt(deploymentIdInput, 10) : undefined

  const octokit = github.getOctokit(token)

  console.log('server url: ', github.context.serverUrl)

  if (deploymentId == null) {
    console.log('No deployment ID provided, creating a new deployment.')

    const response = await octokit.request('POST /repos/{owner}/{repo}/deployments', {
      repo,
      owner,
      ref,
      environment,
      auto_merge: false,
      required_contexts: [],
    })

    console.log('Created deployment.')

    if (response.status !== 201) {
      throw new Error('Could not create a deployment.')
    }

    deploymentId = response.data.id
  }

  console.log(`Creating deployment status as ${state}...`)

  const response = await octokit.request(
    'POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
    {
      repo,
      owner,
      environment,
      deployment_id: deploymentId,
      state,
      environment_url: url,
      auto_inactive: false,
    },
  )

  console.log('Created deployment status.')

  if (response.status !== 201) {
    throw new Error('Could not create a deployment status.')
  }

  console.log('Done creating deployment.')

  core.setOutput(DEPLOYMENT_ID_OUTPUT_KEY, deploymentId)
}

main()
