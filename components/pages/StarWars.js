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
            films
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
                        <input type="text" defaultValue={variables.id} />
                        <button type="submit">See Character</button>
                    </form>
                    <br />
                    <div>{character.name}</div>
                    <div>{character.gender}</div>
                    <div>{character.height}</div>
                    <div>{character.hair_color}</div>
                    {character.films.map(film => <div key={film}>{film}</div>)}
                </>
            )
        }}
        </Query>
    )
}

export default StarWars