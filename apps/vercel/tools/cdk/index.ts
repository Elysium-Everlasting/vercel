import { SvelteKit } from '@svelte.kit/cdk'
import { type } from 'arktype'
import { App, Stack } from 'aws-cdk-lib'
import { config } from 'dotenv'

config({
  path: '../../.env',
})

const envSchema = type(
  {
    'NODE_ENV?': 'string',
  },
  { keys: 'distilled' },
)

async function main(): Promise<void> {
  const stackName = `vercel`

  const app = new App({ autoSynth: true })

  const stack = new Stack(app, stackName)

  const environment = envSchema.assert(process.env)

  const sveltekit = new SvelteKit(stack, stackName, {
    constructProps: {
      handler: () => ({
        environment,
      }),
    },
  })

  await sveltekit.init()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
