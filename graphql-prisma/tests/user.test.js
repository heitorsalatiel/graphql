import 'cross-fetch/polyfill';
import {gql} from 'apollo-boost';
import prisma from './../src/prisma';
import seedDatabase, {userOne} from './utils/seedDatabase';
import getClient from './utils/getClient';
import {getUsers, getProfile, createUser} from './utils/operations';

const client = getClient();

beforeAll(() => {
    jest.setTimeout(10000); 
});
beforeEach(seedDatabase);

test('Should create a new user', async () => {

    const variables = {
        data: {
            name: "Heitor",
            email: "heitortest1@gmail.com",
            password: "1234567800"
        }
    }

    const response = await client.mutate({
        mutation: createUser,
        variables
    });

    const userExists = await prisma.exists.User({
        id: response.data.createUser.user.id
    });

    expect(userExists).toBe(true);

});

test('Should expose public author profile', async () => {

    const response = await client.query({query:getUsers});
    
    expect(response.data.users.length).toBe(2);
    expect(response.data.users[0].email).toBe(null);
    expect(response.data.users[0].name).toBe('Jen');

}); 


test('Should not login with bad credentials', async () => {     
    const login = gql`         
        mutation {             
            login(                                     
                email: "jen@gmail.com",                     
                password: "passwordErrado"                           
            ){                 
                token             
            }         
        }     
    ` 
    await expect(         
        client.mutate({ 
            mutation: login 
        }) 
    ).rejects.toThrow(); 
});

test('Should reject too short password', async () => {
    const variables = {
        data: {
            name: "Daniela",
            email:"dany@gmail.com",
            password: "1234567"
        }
    }

    await expect(
        client.mutate({
            mutation: createUser,
            variables
        })
    ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
    const client = getClient(userOne.jwt);
    
    const {data} = await client.query({query: getProfile});
    expect(data.me.id).toBe(userOne.user.id);
    expect(data.me.name).toBe(userOne.user.name);
    expect(data.me.email).toBe(userOne.user.email);
});
