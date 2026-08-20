export const userTypeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    email: String!
    profileImageURL: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    profileImageURL: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    me: User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;
