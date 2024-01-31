// @ts-check

import core from '@actions/core'
import github from '@actions/github'

async function main() {
  const token = core.getInput('TOKEN')
  const repo = core.getInput('repo')
  const owner = core.getInput('owner')
  const ref = core.getInput('ref')

  const octokit = github.getOctokit(token)

  const response = await octokit.request('GET /repos/{owner}/{repo}/tarball/{ref}', {
    owner,
    repo,
    ref,
  })

  console.log(response)
}

main()
