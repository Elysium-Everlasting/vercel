<script lang="ts">
  import '../app.css'
  import { ModeWatcher } from 'mode-watcher'
  import Header from '$lib/components/layout/header.svelte'
</script>

<div class="">
  <Header />
  <slot />
</div>

<ModeWatcher />
