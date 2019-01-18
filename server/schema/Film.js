const { gql } = require('apollo-server-express');

FilmTypeDef = gql`
    type Film {
        title: String
        episode_id: Int 
        opening_crawl: String
        director: String
        producer: String
        release_date: String
        characters: [String] 
        planets: [String]
        starships: [String]
        vehicles: [String]
        species: [String]
        created: String
        edited: String
        url: String
    }
`

module.exports = {
    FilmTypeDef
}