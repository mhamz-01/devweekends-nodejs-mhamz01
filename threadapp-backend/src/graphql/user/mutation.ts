import {
  createUser,
  loginUser,
  type CreateUserInput,
} from "../../services/user.service.js";

export const userMutations = {
  createUser: (_parent: unknown, { input }: { input: CreateUserInput }) =>
    createUser(input),

  login: (
    _parent: unknown,
    { email, password }: { email: string; password: string }
  ) => loginUser(email, password),
};
