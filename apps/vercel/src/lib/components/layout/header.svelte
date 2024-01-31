<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Sun, Moon, Bell } from 'radix-icons-svelte'
  import { Separator } from '$lib/components/ui/separator'
  import * as Popover from '$lib/components/ui/popover'
  import * as Tabs from '$lib/components/ui/tabs'

  import { toggleMode } from 'mode-watcher'
</script>

<div class="flex justify-between px-8">
  <!-- Left -->
  <div class="flex justify-between p-4 gap-4">
    <div class="flex items-center">
      <a href="/">
        <span class="fill-primary">
          <svg aria-label="Vercel Logo" viewBox="0 0 75 65" height="22">
            <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
          </svg>
        </span>
      </a>
    </div>

    <Separator class="h-auto rotate-[30deg]" orientation="vertical" decorative />

    <div class="flex items-center">Username</div>
  </div>

  <!-- Right -->
  <div class="flex items-center gap-2 p-4">
    <div class="space-x-1">
      <Button href="/feedback" target="_blank" variant="outline" class="text-md">Feedback</Button>

      <Button href="/docs" target="_blank" variant="ghost">Docs</Button>

      <Button href="/changelog" target="_blank" variant="ghost">Changelog</Button>

      <Button href="/help" target="_blank" variant="ghost">Help</Button>
    </div>

    <div>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="ghost" size="icon" class="rounded-full">
            <Bell class="h-[1.2rem] w-[1.2rem]" />
            <span class="sr-only">Notifications</span>
          </Button>
        </Popover.Trigger>

        <Popover.Content>
          <Tabs.Root value="inbox">
            <Tabs.List class="w-full">
              <Tabs.Trigger value="inbox" class="w-full">Inbox</Tabs.Trigger>
              <Tabs.Trigger value="archive" class="w-full">Archive</Tabs.Trigger>
              <Tabs.Trigger value="comments" class="w-full">Comments</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="inbox">
              <div class="h-96 flex items-center justify-center">
                <h2>Inbox!</h2>
              </div>
            </Tabs.Content>

            <Tabs.Content value="archive">
              <div class="h-96 flex items-center justify-center">
                <h2>Archive!</h2>
              </div>
            </Tabs.Content>

            <Tabs.Content value="comments">
              <div class="h-96 flex items-center justify-center">
                <h2>Comments!</h2>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </Popover.Content>
      </Popover.Root>
    </div>

    <div class="">
      <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>

    <div></div>
  </div>
</div>
