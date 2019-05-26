import prisma from './../../src/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userOne = {
    input: {
        name: "Jen",
        email: "jen@gmail.com",
        password: bcrypt.hashSync("123456789")
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: "Mario",
        email:"mario@gmail.com",
        password: bcrypt.hashSync("0987654321")
    },
    user: undefined,
    jwt: undefined
}

const postOne = {
    input:{
        title: 'Automatic Post Test',
        body: 'Created a test to run Test Automations',
        published: true
    },
    post: undefined
}

const postTwo = {
    input:{
        title: 'Post to be deleted',
        body: 'This post should be deleted',
        published: true
    },
    post: undefined
}

const commentOne = {
    input: {
        text: "First dummy comment to test",
    },
    comment: undefined
}

const commentTwo = {
    input: {
        text: "Second dummy comment to test",
    },
    comment: undefined
}

const seedDatabase = async () => {
    //Delete test data
    await prisma.mutation.deleteManyComments();
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();

    //Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    });
    userOne.jwt = jwt.sign({userId:userOne.user.id}, process.env.PRISMA_TOKEN_SECRET)
    
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    });
    userTwo.jwt = jwt.sign({userId:userTwo.user.id}, process.env.PRISMA_TOKEN_SECRET)

    //Create PostOne
    postOne.post = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect:{
                    id: userOne.user.id
                }
            }
        }
    });

    //Create postTwo
    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect:{
                    id: userOne.user.id
                }
            }
        }
    });

    //Create commentOne
    commentOne.comment = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            author: {
                connect:{
                    id: userTwo.user.id
                } 
            },
            post: {
                connect:{
                    id: postOne.post.id
                }
            }
        }
    });

    //Create commentTwo
    commentTwo.comment = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            author: {
                connect:{
                    id: userOne.user.id
                } 
            },
            post: {
                connect:{
                    id: postOne.post.id
                }
            }
        }
    });
}

export {seedDatabase as default, userOne,userTwo, postOne, postTwo, commentOne, commentTwo};