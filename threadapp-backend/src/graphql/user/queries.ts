import { GraphQLError } from "graphql";
import type { GraphQLContext } from "../context.js";
import { getUsers, getUserById } from "../../services/user.service.js";

function requireAuth(context: GraphQLContext) {
  if (!context.user) {
    throw new GraphQLError("You must be logged in to do this", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return context.user;
}

export const userQueries = {
  users: () => getUsers(),

  user: (_parent: unknown, { id }: { id: string }) => getUserById(id),

  me: (_parent: unknown, _args: unknown, context: GraphQLContext) => {
    const user = requireAuth(context);
    return getUserById(user.id);
  },
};
