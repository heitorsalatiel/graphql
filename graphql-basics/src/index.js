import {GraphQLServer} from 'graphql-yoga';

//Scalar Types = String, Boolean, Int/Float/Double, ID (unique identifiers)

//Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa:Float
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
        me: User!
        post: Post!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID
        title: String!
        pubilshed: Boolean!
    }
`
//Resolvers
const resolvers = {
    Query: {
        id() {
            return 30;
        },
        name(){
            return 'Heitor';
        },
        age(){
            return 27;
        },
        employed(){
            return true;
        },
        gpa(){
            return 3.5;
        },
        title(){
            return 'acai';
        },
        price(){
            return 31.50;
        },
        releaseYear(){
            return 2019;
        },
        rating(){
            return null;
        },
        inStock(){
            return true;
        },
        me(){
            return {
                id: '2',
                name: 'Heitor',
                email: 'heitor@gmail.com',
                age: '29'
            }
        },
        post() {
            return {
                id: 23,
                title: 'The life',
                pubilshed: true
            }
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