import { makeExecutableSchema } from '@graphql-tools/schema'
import gql from 'graphql-tag'

const typeDefs = gql``

export default makeExecutableSchema({ typeDefs: typeDefs as any })
