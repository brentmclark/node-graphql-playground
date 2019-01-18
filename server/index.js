/**
 * Started from https://github.com/apollographql/apollo-server
 */
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('isomorphic-unfetch')
const { CharacterTypeDef } = require('./schema/Character')
const { FilmTypeDef } = require('./schema/Film')

async function getCharacter (id) {
    const response = await fetch(`https://swapi.co/api/people/${id}`)
    character = await response.json()
    return character
}

async function getFilm (id) {
  const response = await fetch(`https://swapi.co/api/films/${id}/`)
  film = await response.json()
  return film
}

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    character(id: Int!): Character
  }

  ${CharacterTypeDef}
  ${FilmTypeDef}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    character(parent, args, context, info) {
        return getCharacter(args.id, info)
    },
  },
  Character: {
    films(character) {
      return character.films.map(film => {
        const filmParts = film.split('/')
        const filmId = filmParts[filmParts.length - 2]
        return getFilm(filmId)
      })
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);