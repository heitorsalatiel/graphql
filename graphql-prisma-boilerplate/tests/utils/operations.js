import {gql} from 'apollo-boost';

const createUser = gql`
    mutation($data:CreateUser!) {
        createUser(
            data: $data
        ){
            token,
            user{
                id
                name
                email
            }
        }
    }
`

const getUsers = gql`
    query{
        users{
            id
            name
            email
        }
    }
`

const getProfile = gql`
    query {
        me{
            id
            name
            email
        }
    }
`

export {createUser, getProfile, getUsers}