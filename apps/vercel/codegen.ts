import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'schema.docs.graphql',
  documents: ['src/**/*.{ts,svelte}'],
  debug: true,
  verbose: true,
  generates: {
    './src/lib/__generated__/': {
      preset: 'client-preset',
      config: {
        useTypeImports: true,
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
