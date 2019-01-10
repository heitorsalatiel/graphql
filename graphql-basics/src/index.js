import {GraphQLServer} from 'graphql-yoga';

//Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`
//Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my  first query!'
        },
        name() {
            return 'Heitor Salatiel'
        },
        location() {
            return 'BH'
        },
        bio() {
            return 'I\'m a nice guy'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!');
})