import { GraphQLError } from "graphql";
import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImageURL?: string | null;
}

export function getUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(input: CreateUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new GraphQLError("A user with this email already exists", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const { hash, salt } = hashPassword(input.password);

  return prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      profileImageURL: input.profileImageURL ?? null,
      password: hash,
      salt,
    },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !verifyPassword(password, user.salt, user.password)) {
    throw new GraphQLError("Invalid email or password", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  const token = signToken({ id: user.id, email: user.email });
  return { token, user };
}
