import {GraphQLServer} from 'graphql-yoga';

//Scalar Types = String, Boolean, Int/Float/Double, ID (unique identifiers)

const users = [
    {
        id: '1',
        name: 'Heitor',
        email: 'heitor@gmail.com',
        age: '29'
    },
    {
        id: '2',
        name: 'Lais',
        email: 'lais@gmail.com',
        age: '30'
    },
    {
        id: '3',
        name: 'Arthur',
        email: 'arthur@gmail.com',
        age: '27'
    }
];

const posts = [
    {
        id: '1',
        title: 'A arte de ser feliz',
        body: 'Vem ser feliz programando',
        pubilshed: true,
        author: '1'
    },
    {
        id: '2',
        title: 'Viajando o mundo',
        body: 'Vamos viajar o mundo todo',
        pubilshed: false,
        author: '2'
    },
    {
        id: '3',
        title: 'Cozinhando como profissional',
        body: 'A comida esta muito boa',
        pubilshed: true,
        author: '3'
    }
]

const comments = [
    {
        id:'1',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        author:'1',
        post:'1'
    },
    {
        id:'2',
        text:'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        author:'2',
        post:'2'
    },
    {
        id:'3',
        text:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        author:'3',
        post:'3'
    },
    {
        id:'4',
        text:'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        author:'1',
        post:'3'
    }
]

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

        greeting(name: String, position: String): String!
        add(a: Float!, b: Float!):Float!

        grades: [Int!]!
        sum(numbers:[Float!]!): Float!
        users(query: String):[User!]!
        posts(query: String):[Post!]!
        comments: [Comment!]!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts:[Post!]!
        comments:[Comment!]!
    }

    type Post {
        id: ID
        title: String!
        body: String!
        pubilshed: Boolean!
        author: User!
        comments:[Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`
//Resolvers
const resolvers = {
    Query: {

        //Scalar Types
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

        //Custom Types
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
                body: 'Sun is shining the weather is sweet',
                pubilshed: true
            }
        },

        //Operation Arguments
        greeting(parent, args, ctx, info) {
            return args.name ? 
            args.position ? `Hello ${args.name} ! You are a ${args.position}` : `Hello ${args.name}`
             : 'Hello!';
        },
        add(parent,args,ctx,info){
            return args.a + args.b;
        },

        //Arrays
        grades(parent, args, ctx, info){
            return [99,44,930,999,303];
        },
        sum(parent, args, ctx, info){
            if(args.numbers.length === 0)
                return 0;
            return args.numbers.reduce((prev,current)=> {
                return prev + current;
            })
        },
        users(parent, args, ctx, info) {
            return !args.query ? users: 
            users.filter((value,index) => {
                return value.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parent, args, ctx, info){
            return !args.query ? posts :
            posts.filter((value,index) => {
                return value.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) ||
                value.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
            })
        },
        comments(parent, args, ctx, info){
            return comments;
        }

    },
    Post: {
        author(parent,args,ctx, info) {
            return users.find((user,index) => {
                return parent.author === user.id;
            })
        },
        comments(parent, args,ctx,info){
            return comments.filter((comment,index) => {
                return comment.post === parent.id;
            })
        }
    },
    User:{
        posts(parent,args,ctx,info) {
            return posts.filter((post,index) => {
                return parent.id === post.author;
            });
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment,index) => {
                return parent.id === comment.author;
            })
        }
    },
    Comment: {
        author(parent,args,ctx,info) {
            return users.find((user,index) => {
                return user.id === parent.author;
            })
        },
        post(parent,args,ctx,info) {
            return posts.find((post,index) => {
                return post.id === parent.post;
            })
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