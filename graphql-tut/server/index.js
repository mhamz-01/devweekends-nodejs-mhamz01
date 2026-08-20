const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
      }

      type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!): User
      }
    `,

    resolvers: {
      Query: {
        getTodos: async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );    

          return response.data;
          
        },
        getAllUsers:async ()=> (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
        getUser: async  (parent, {id})=>
        (await axios.get(`https://jsonplacehoder.typicode.com/users/${id}`)).data
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("Server started on http://localhost:8000/graphql");
  });
}

startServer();