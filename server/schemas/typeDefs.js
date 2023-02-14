const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    art: [Art]!
  }

  type Art {
    _id: ID
    artId: String
    artAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    art(username: String): [Art]
    artSingle(artId: ID!): Art
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addArt(artId: Int!): Art
    addComment(artId: ID!, commentText: String!): Art
    removeArt(artId: ID!): Art
    removeComment(artId: ID!, commentId: ID!): Art
  }
`;

module.exports = typeDefs;
