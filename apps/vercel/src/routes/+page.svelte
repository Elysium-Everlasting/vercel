<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Sun, Moon } from "radix-icons-svelte";
  import { toggleMode } from "mode-watcher";
</script>

<Button on:click={toggleMode} variant="outline" size="icon">
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</Button>

<Tabs.Root value="account" class="w-[400px]">
  <Tabs.List class="grid w-full grid-cols-2">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    <Card.Root>
      <Card.Header>
        <Card.Title>Account</Card.Title>
        <Card.Description>
          Make changes to your account here. Click save when you're done.
        </Card.Description>
      </Card.Header>
      <Card.Content class="space-y-2">
        <div class="space-y-1">
          <Label for="name">Name</Label>
          <Input id="name" value="Pedro Duarte" />
        </div>
        <div class="space-y-1">
          <Label for="username">Username</Label>
          <Input id="username" value="@peduarte" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button>Save changes</Button>
      </Card.Footer>
    </Card.Root>
  </Tabs.Content>
  <Tabs.Content value="password">
    <Card.Root>
      <Card.Header>
        <Card.Title>Password</Card.Title>
        <Card.Description>
          Change your password here. After saving, you'll be logged out.
        </Card.Description>
      </Card.Header>
      <Card.Content class="space-y-2">
        <div class="space-y-1">
          <Label for="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div class="space-y-1">
          <Label for="new">New password</Label>
          <Input id="new" type="password" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button>Save password</Button>
      </Card.Footer>
    </Card.Root>
  </Tabs.Content>
</Tabs.Root>
