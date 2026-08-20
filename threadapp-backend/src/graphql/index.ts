import { userResolvers, userTypeDefs } from "./user/index.js";

type ResolverMap = Record<string, Record<string, unknown>>;

function mergeResolvers(resolverMaps: ResolverMap[]): ResolverMap {
  const merged: ResolverMap = {};

  for (const resolverMap of resolverMaps) {
    for (const [typeName, fields] of Object.entries(resolverMap)) {
      merged[typeName] = { ...merged[typeName], ...fields };
    }
  }

  return merged;
}

export const resolvers = mergeResolvers([userResolvers]);
export const typeDefs = [userTypeDefs];
