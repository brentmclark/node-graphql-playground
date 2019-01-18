import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from '../ErrorMessage'

const starWarsCharactersQuery = gql`
    query starWarsCharacter($id: Int!) {
        character(id: $id) {
            name
            gender
            height
            hair_color
            films {
                title
                episode_id
                opening_crawl
            }
        }
    }
`

const queryVariables = {
    id: 1
}

function StarWars(props) {
    return (

        <Query query={starWarsCharactersQuery} variables={queryVariables}>
        {({ loading, error, data: { character },variables, refetch }) => {
            if (error) return <ErrorMessage message='Error loading posts.' />
            if (loading) return <div>Loading</div>
            console.log({variables})
            return (
                <>
                    <form
                        onSubmit={
                            (event) => {
                                refetch({id: Number(event.target.elements[0].value)})
                            }
                        }
                    >
                        <label>Character Id</label>
                        <input type="number" defaultValue={variables.id} />
                        <button type="submit">See Character</button>
                    </form>
                    <br/>
                    <h1>Character</h1>
                    <div><strong>Name:</strong>{character.name}</div>
                    <div><strong>Gender:</strong>{character.gender}</div>
                    <div><strong>Height:</strong>{character.height} cm</div>
                    <div><strong>Hair Color:</strong>{character.hair_color}</div>
                    <br/>
                    <strong>Films:</strong>
                    {character.films.map(film => (
                        <div key={film.title}>
                            <div><h3>{film.title} (episode: {film.episode_id})</h3></div>
                            <div><em>{film.opening_crawl}</em></div>
                        </div>
                    ))}
                </>
            )
        }}
        </Query>
    )
}

export default StarWars