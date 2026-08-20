import { userQueries } from "./queries.js";
import { userMutations } from "./mutation.js";

export const userResolvers = {
  User: {
    fullName: (parent: { firstName: string; lastName: string }) =>
      `${parent.firstName} ${parent.lastName}`,
    createdAt: (parent: { createdAt: Date }) => parent.createdAt.toISOString(),
    updatedAt: (parent: { updatedAt: Date }) => parent.updatedAt.toISOString(),
  },

  Query: userQueries,

  Mutation: userMutations,
};
