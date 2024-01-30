<script lang="ts">
  import GitCommit from 'lucide-svelte/icons/git-commit-horizontal'
  import GitFork from 'lucide-svelte/icons/git-branch'
  import * as Card from '$lib/components/ui/card'
  import type { PageData } from './$types'
  import { type } from 'arktype'

  const payloadSchema = type({
    'id?': 'string',
    'sha?': 'string',
    'message?' : 'string',
  })

  export let data: PageData

</script>

<div>
  <h1>Number of deployments: {data.deployments.length}</h1>
</div>

<div>
  {#each data.deployments as deployment}
    {@const payload = payloadSchema(deployment.payload ?? {})}
    <Card.Root class="p-2">
      <Card.Content class="flex pb-0">
        <p>ID: {payload.data?.id}</p>
        <div class="flex items-center gap-2">
          <div><GitFork /></div>
          <p>{deployment.ref}</p>
        </div>

        <div class="flex items-center gap-2">
          <div><GitCommit /></div>
          <p>Short sha: {payload.data?.sha} / message: {payload.data?.message}</p>
        </div>
        <p>{deployment.creator?.login}</p>
      </Card.Content>
    </Card.Root>
  {/each}
</div>
