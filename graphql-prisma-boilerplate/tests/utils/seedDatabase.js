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


const seedDatabase = async () => {
    //Delete test data
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
}

export {seedDatabase as default, userOne,userTwo};