import {GraphQLServer} from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

//Scalar Types = String, Boolean, Int/Float/Double, ID (unique identifiers)

let users = [
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

let posts = [
    {
        id: '1',
        title: 'A arte de ser feliz',
        body: 'Vem ser feliz programando',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'Viajando o mundo',
        body: 'Vamos viajar o mundo todo',
        published: false,
        author: '2'
    },
    {
        id: '3',
        title: 'Cozinhando como profissional',
        body: 'A comida esta muito boa',
        published: true,
        author: '3'
    }
]

let comments = [
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
        users(query: String):[User!]!
        posts(query: String):[Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser (data: CreateUserInput): User!
        deleteUser(id: ID!):User!
        createPost(data: CreatePostInput): Post!
        deletePost(id: ID!): Post!
        createComment(data:CreateCommentInput) : Comment!
        deleteComment(id: ID!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts:[Post!]!
        comments:[Comment!]!
    }

    input CreatePostInput{
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    type Post {
        id: ID
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments:[Comment!]!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
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
    Mutation : {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user,index) => {
                return user.email === args.data.email;
            });

            if (emailTaken) {
                throw new Error('Email already taken');
            }
            
            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user);

            return user;

        },

        deleteUser(parent, args, ctx, info) {
            const userIdx = users.findIndex((user,index) => user.id === args.id);
            if(userIdx < 0) throw Error ('User not found');
            
            const deletedUser = users.splice(userIdx,1)[0];

            posts = posts.filter((post,index) => {
                const match = post.author === args.id
                if(match){
                    comments = comments.filter((comment,idx) => {
                        return comment.post !== post.id;
                    });
                }
                return !match
            });
            comments = comments.filter((comment,index) => comment.author !== args.id);

            return deletedUser;
            
        },

        createPost(parent,args,ctx,info) {
            const userExist = users.some((user,index) => {
                return user.id === args.data.author;
            });

            if(!userExist) {
                throw new Error('User not found');
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post);
            return post;
        },
        deletePost(parente,args,ctx,info){
            const postIndex = posts.findIndex((post,index) => {
                return post.id == args.id;
            });
            if(postIndex < 0) throw Error('Post not found');
            const post = posts.splice(postIndex,1)[0];
            comments = comments.filter((comment,index) => comment.post !== args.id);

            return post;
        },
        createComment(parent,args,ctx,info) {
            const userExists = users.some((user,index) => {
                return user.id === args.data.author
            });

            const postExists = posts.find((post,index) => {
                return post.id === args.data.post
            });

            if(!userExists) {
                throw new Error('User not found');
            }
            if(!postExists) {
                throw new Error('Post not found');
            }
            if(!postExists.published){
                throw new Error('Post is not published yet');
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment);

            return comment;
        },
        deleteComment(parent, args, ctx, info) {
            const commentIndex = comments.findIndex((comment,index) => comment.id === args.id);
            
            if(commentIndex < 0) throw Error('Comment not found');

            const comment = comments.splice(commentIndex,1)[0];
            
            return comment;
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