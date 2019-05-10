import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from '../ErrorMessage'

const starWarsCharactersQuery = gql`
query luke {
  character @rest(type: "Character", path: "people/1/") {
    name
    gender
    height
    hair_color
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
                </>
            )
        }}
        </Query>
    )
}

export default StarWars