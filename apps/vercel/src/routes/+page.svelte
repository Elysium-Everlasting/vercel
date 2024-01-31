<script lang="ts">
  import GitCommit from 'lucide-svelte/icons/git-commit-horizontal'
  import GitFork from 'lucide-svelte/icons/git-branch'
  import * as Card from '$lib/components/ui/card'
  import type { PageData } from './$types'

  interface StatusDisplay {
    text: string
    color: string
  }

  const statuses: Record<string, StatusDisplay> = {
    ACTIVE: {
      text: 'Ready',
      color: 'bg-green-300',
    },
  }

  function getStatusInfo(status?: string | null) {
    if (!status) {
      return { text: 'Unknown', color: 'bg-gray-100' }
    }
    return statuses[status] ?? { text: status, color: 'bg-gray-100' }
  }

  export let data: PageData
</script>

<div class="max-w-7xl mx-auto">
  {#each data.repository?.deployments.edges ?? [] as deployment}
    {@const status = getStatusInfo(deployment?.node?.state)}

    <Card.Root class="p-2">
      <Card.Content class="flex pb-0 justify-between">
        <div class="">
          <p class="font-bold">{deployment?.node?.id}</p>
          <p>{deployment?.node?.latestEnvironment}</p>
        </div>

        <div class="flex items-center gap-2">
          <div
            class="w-3 h-3 rounded-full {status.color}"
            style="background-color: ${status.color}"
          ></div>
          <p>{status.text}</p>
        </div>

        <div>
          <div class="flex items-center gap-2">
            <div>
              <GitFork class="w-5 h-5" />
            </div>
            <p>{deployment?.node?.ref?.name}</p>
          </div>

          <div class="flex items-center gap-2">
            <div>
              <GitCommit class="w-5 h-5" />
            </div>
            <p>
              <span>
                {deployment?.node?.commit?.abbreviatedOid}
              </span>
              <span>
                {deployment?.node?.commit?.message}
              </span>
            </p>
          </div>
        </div>

        <div class="flex items-center">
          <p>
            {deployment?.node?.commit?.committedDate} by {deployment?.node?.commit?.author?.name}
          </p>
          <div class="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={deployment?.node?.commit?.author?.avatarUrl}
              alt="committer avatar"
              class="w-full h-full"
            />
          </div>
        </div>
        <!--
        <p>{deployment.creator?.login}</p>
        -->
      </Card.Content>
    </Card.Root>
  {/each}
</div>
