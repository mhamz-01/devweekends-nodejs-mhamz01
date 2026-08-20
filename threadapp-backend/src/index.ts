import "dotenv/config";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs, resolvers } from "./graphql/index.js";
import { createContext, type GraphQLContext } from "./graphql/context.js";

const app = express();

const PORT = Number(process.env.PORT) || 8000;

const gqlServer = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  includeStacktraceInErrorResponses: process.env.NODE_ENV !== "production",
});

async function startServer() {
  await gqlServer.start();

  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
      context: createContext,
    })
  );

  app.get("/", (req, res) => {
    res.json({
      message: "Server is up and running",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
    console.log(`GraphQL: http://localhost:${PORT}/graphql`);
  });
}

startServer();
