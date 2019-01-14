/**
 * Started from https://github.com/apollographql/apollo-server
 */
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('isomorphic-unfetch')
const { CharacterTypeDef } = require('./schema/Character')

async function getCharacter (id) {
    const response = await fetch(`https://swapi.co/api/people/${id}`)
    character = await response.json()
    return character
}

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    character(id: Int!): Character
  }

  ${CharacterTypeDef}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    character(parent, args, context, info) {
        return getCharacter(args.id)
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);