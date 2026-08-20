import type { Request } from "express";
import { prisma } from "../lib/prisma.js";
import { verifyToken, type JwtPayload } from "../utils/jwt.js";

export interface GraphQLContext {
  prisma: typeof prisma;
  user: JwtPayload | null;
}

export async function createContext({
  req,
}: {
  req: Request;
}): Promise<GraphQLContext> {
  const authHeader = req.headers.authorization ?? "";
  const [scheme, token] = authHeader.split(" ");

  const user =
    scheme === "Bearer" && token ? verifyToken(token) : null;

  return { prisma, user };
}
