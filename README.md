# node-graphql-playground
A place where I can play around with GraphQL in node

Before you do anything else, run `npm i`

## Server

### Getting Started
1. `npm run server`
1. Open your browser to http://localhost:4000/graphql
1. make a query against the schema.  This one should work:
```
query starWarsCharacter {
  character(id: 1) {
    name
    gender
    height
    hair_color
    films
  }
}
```

## Client

### Getting Started

1. `npm run dev`
1. Open your browser to `http://localhost:3000`