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

const seedDatabase = async () => {
    //Delete test data
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();

    //Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    });
    userOne.jwt = jwt.sign({userId:userOne.user.id}, process.env.PRISMA_TOKEN_SECRET)

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

    //Create PostTwo
    await prisma.mutation.createPost({
        data: {
            title: 'Automatic Post Test 2',
            body: 'Created a test to run Test Automations 2',
            published: false,
            author: {
                connect:{
                    id: userOne.user.id
                }
            }
        }
    });
}

export {seedDatabase as default, userOne, postOne, postTwo};