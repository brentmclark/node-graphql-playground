# node-graphql-playground
A place where I can play around with GraphQL in node

## Getting Started
1. `npm i`
1. `npm start`
1. Open your browser to http://localhost:4000/graphql
1. make a query againast the scema.  This one should work:
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
