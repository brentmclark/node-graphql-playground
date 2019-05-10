// import { ApolloClient, InMemoryCache, HttpLink, split, concat } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { RestLink } from 'apollo-link-rest'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch

  // Need to polyfill Headers I guess?  See https://github.com/apollographql/apollo-link-rest/issues/41#issuecomment-359893024
  if (global.Headers == null) {
    const nodeFetch = require('node-fetch');
    global.Headers = nodeFetch.Headers;
  }
}

const graphqlSplitLinks = ApolloLink.split(
    (operation) => operation.operationName === 'starWarsCharacter',
    new HttpLink({
        uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
        credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
      }),
    new HttpLink({
        uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
        credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
      })
  );

// Create a RestLink for the REST API
// If you are using multiple link types, restLink should go before httpLink,
// as httpLink will swallow any calls that should be routed through rest!
const restLink = new RestLink({
  uri: 'https://swapi.co/api/',
});

const link = ApolloLink.from([
  restLink,
  graphqlSplitLinks,
])

function create (initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: link,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}