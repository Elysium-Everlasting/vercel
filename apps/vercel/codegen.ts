import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'schema.docs.graphql',
  documents: ['src/**/*.{ts,svelte}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
