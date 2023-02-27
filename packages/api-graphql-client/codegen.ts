import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../api-graphql/src/schema.graphql',
  documents: ['src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
    },
  },
}

export default config
