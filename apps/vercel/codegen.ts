import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'schema.docs.graphql',
  documents: ['./src/**/*.{ts,svelte}'],
  generates: {
    './src/lib/__generated__/': {
      preset: 'client-preset',
    },
  },
  ignoreNoDocuments: true,
}

export default config
