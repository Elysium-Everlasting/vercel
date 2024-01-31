<script lang="ts">
  import GitCommit from 'lucide-svelte/icons/git-commit-horizontal'
  import GitFork from 'lucide-svelte/icons/git-branch'
  import * as Card from '$lib/components/ui/card'
  import type { PageData } from './$types'
  import { invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'

  interface StatusDisplay {
    text: string
    color: string
  }

  const statuses: Record<string, StatusDisplay> = {
    ACTIVE: {
      text: 'Ready',
      color: 'bg-green-300',
    },
    INACTIVE: {
      text: 'Inactive',
      color: 'bg-gray-500',
    },
  }

  function getStatusInfo(status?: string | null) {
    if (!status) {
      return { text: 'Unknown', color: 'bg-gray-100' }
    }
    return statuses[status] ?? { text: status, color: 'bg-gray-100' }
  }

  export let data: PageData

  // onMount(() => {
  //   const interval = setInterval(invalidateAll, 1000 * 5)
  //   return () => {
  //   clearInterval(interval)
  //   }
  // })
</script>

<div class="max-w-7xl mx-auto">
  {#each data.repository?.deployments ?? [] as deployment}
    {@const status = getStatusInfo(deployment.state)}

    <Card.Root class="p-2">
      <Card.Content class="flex pb-0">
        <!-- Section 1 -->
        <div class="basis-0 grow shrink">
          <a href={deployment.latestStatus?.logUrl} class="font-bold text-sm hover:underline">
            {deployment.id}
          </a>
          <p class="opacity-80 text-sm">
            {deployment.latestEnvironment}
          </p>
        </div>

        <!-- Section 2 -->
        <div class="w-40 flex justify-stretch items-center gap-2 grow-0 shrink-0">
          <div
            class="w-3 h-3 rounded-full {status.color}"
            style="background-color: ${status.color}"
          ></div>
          <p class="text-sm">{status.text}</p>
        </div>

        <!-- Section 3 -->
        <div class="flex flex-col shrink overflow-hidden text-xs basis-0 grow shrink">
          <div class="flex items-center gap-2">
            <div>
              <GitFork class="w-5 h-5" />
            </div>
            <a href={deployment.treeUrl} class="hover:underline">
              {deployment.ref?.name}
            </a>
          </div>

          <div class="flex items-center gap-2">
            <div>
              <GitCommit class="w-5 h-5" />
            </div>

            <a href={deployment.commit?.commitUrl} class="group truncate">
              <span class="group-hover:underline">
                {deployment.commit?.abbreviatedOid}
              </span>
              <span class="truncate group-hover:underline">
                {deployment.commit?.message}
              </span>
            </a>
          </div>
        </div>

        <!-- Section 4 -->
        <div class="flex items-center justify-end gap-2 text-sm basis-0 grow shrink">
          <p class="truncate">
            {deployment.lastUpdatedRelative} by {deployment.commit?.author?.name}
          </p>
          <div class="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={deployment?.commit?.author?.avatarUrl}
              alt="committer avatar"
              class="w-full h-full"
            />
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  {/each}
</div>
