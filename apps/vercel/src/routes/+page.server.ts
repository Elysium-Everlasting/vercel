import type { PageServerLoad } from './$types'

import { octokit } from '$lib/github'

export const load: PageServerLoad = async () => {
  // const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
  //   owner: 'elysium-everlasting',
  //   repo: 'demo',
  // })

  const response = await octokit.request('GET /repos/{owner}/{repo}/deployments', {
    owner: 'elysium-everlasting',
    repo: 'demo',
  })

  return {
    deployments: response.data,
  }
}
