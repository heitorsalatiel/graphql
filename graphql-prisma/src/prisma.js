import {Prisma} from 'prisma-binding';
import {fragmentReplacements} from './resolvers/resolvers';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint:   process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
});


export default prisma;

// const createPostForUser = async (authorId,data) => {

//     const userExists = await prisma.exists.User({
//         id: authorId
//     });

//     if(!userExists) throw new Error('Specified user not found');

//     const post = await prisma.mutation.createPost({
//         data : {
//             ...data,
//             author: {
//                 connect:{
//                     id: authorId
//                 }
//             }
//         }
//     },'{id title body published author{id name email age posts{id title body published}}}');

//      return post.author;
// }

// createPostForUser('cjr3z3m3100250723dpyfsxqt',
//     {
//         title: 'Async/Await GraphQL', 
//         body:'Using Async/Await in GraphQL',
//         published: true
//     }
// ).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
// }).catch(({message}) => {
//     console.log(message);
// })

// const updatePostForUser =  async (postId,data) => {

//     const postExists = await prisma.exists.Post({
//         id:postId
//     });

//     if(!postExists) throw new Error('Specified post not found');

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id:postId
//         },
//         data: {
//             ...data
//         }
//     },'{author{id name age email posts{id title body published}}}');

//     return post.author;
// }

// updatePostForUser("cjr4xrhky00060723tzf28ltf",{
//     title: "How to implement the graphql mutation",
//     body:"tutorial to implement the graphql mutation",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined,2));
// }).catch(({message}) => {
//     console.log(message);
// })


// prisma.mutation.createPost({
//     data: {
//         title:"New GraphQL Post",
//         body: "Testing GraphQL CLI Mutations",
//         published: true,
//         author: {
//             connect: {
//                 id:"cjr3z3m3100250723dpyfsxqt"
//             }
//         }
//     }
// }, '{title body published author{id name email age}}').then((post) => {
//     console.log(post);
//     return prisma.query.users(null,'{id name email age posts{id title}}')
// }).then((users) => {
//     console.log(JSON.stringify(users,undefined,2));
// })

