import { SvelteKit } from '@svelte.kit/cdk'
import { type } from 'arktype'
import { App, Stack } from 'aws-cdk-lib'
import { config } from 'dotenv'

config({
  path: '../../.env',
})

const envSchema = type(
  {
    APP_ID: 'string',
    CLIENT_SECRET: 'string',
    WEBHOOK_SECRET: 'string',
    PRIVATE_KEY: 'string',
    DATABASE_URL: 'string',
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
      handler: () => {
        return {
          environment,
        }
      },
    },
  })

  await sveltekit.init()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
