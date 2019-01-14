const { gql } = require('apollo-server-express');

CharacterTypeDef = gql`
type Character {
    name: String
    height: Int
    mass: Int
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String
    homeworld: String
    films: [String]
    species: [String]
    vehicles: [String]
    starships: [String]
    created: String
    edited: String
    url: String
  }
`

module.exports = {
    CharacterTypeDef
}