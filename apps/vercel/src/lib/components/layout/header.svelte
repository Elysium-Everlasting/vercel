<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Sun, Moon, Bell, CaretSort } from 'radix-icons-svelte'
  import { Separator } from '$lib/components/ui/separator'
  import { Badge } from '$lib/components/ui/badge'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
  import * as Popover from '$lib/components/ui/popover'
  import * as Tabs from '$lib/components/ui/tabs'
  import { page } from '$app/stores'

  import { toggleMode } from 'mode-watcher'

  $: user = $page.data.user
</script>

<div class="flex justify-between px-8">
  <!-- Left -->
  <div class="p-4 flex items-center justify-between gap-2">
    <div class="flex items-center">
      <a href="/">
        <span class="fill-primary">
          <svg aria-label="Vercel Logo" viewBox="0 0 75 65" height="32">
            <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
          </svg>
        </span>
      </a>
    </div>

    <Separator class="h-auto rotate-[30deg]" orientation="vertical" decorative />

    <div class="flex items-center gap-1">
      <Button class="p-1 flex items-center gap-2 h-full" variant="ghost">
        <div>
          <img src={user?.avatarUrl} alt="User avatar" class="w-8 h-8 rounded-full" />
        </div>

        <div>
          <p>{user?.login}</p>
        </div>

        <div>
          <Badge variant="secondary" class="rounded-full">Hobby</Badge>
        </div>
      </Button>

      <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <CaretSort />
          </Button>
        </Popover.Trigger>

        <Popover.Content>Command Menu</Popover.Content>
      </Popover.Root>
    </div>
  </div>

  <!-- Right -->
  <div class="flex items-center gap-2 p-4">
    <div class="space-x-1">
      <Button href="/feedback" target="_blank" variant="outline" class="text-md">Feedback</Button>

      <Button href="/docs" target="_blank" variant="ghost">Docs</Button>

      <Button href="/changelog" target="_blank" variant="ghost">Changelog</Button>

      <Button href="/help" target="_blank" variant="ghost">Help</Button>
    </div>

    <div class="flex items-center">
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="ghost" size="icon" class="rounded-full">
            <Bell class="h-[1.2rem] w-[1.2rem]" />
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

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost" size="icon" class="rounded-full">
            <img src={user?.avatarUrl} alt="User avatar" class="w-8 h-8 rounded-full" />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content class="p-4 space-y-4">
          <DropdownMenu.Group>
            <DropdownMenu.Label>
              {user?.email || user?.login}
            </DropdownMenu.Label>
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          <DropdownMenu.Group>
            <DropdownMenu.Item>Dashboard</DropdownMenu.Item>
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Item>Create Team</DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          <DropdownMenu.Group>
            <DropdownMenu.Item>Command Menu</DropdownMenu.Item>
            <DropdownMenu.Item>Theme</DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          <DropdownMenu.Group>
            <DropdownMenu.Item>Vercel Homepage</DropdownMenu.Item>
            <DropdownMenu.Item>Logout</DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          <DropdownMenu.Group>
            <Button href="/upgrade" target="_blank" size="lg" class="w-full px-8">
              Upgrade to Pro
            </Button>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>

    <div>
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
  </div>
</div>
