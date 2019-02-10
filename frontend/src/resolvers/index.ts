import { authDefaults, authResolvers } from './authResolver'

export const defaults = {
  ...authDefaults
}

export const resolvers = {
  Mutation: {
    ...authResolvers
  }
}
