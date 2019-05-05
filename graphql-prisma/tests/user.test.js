import 'cross-fetch/polyfill';
import {gql} from 'apollo-boost';
import prisma from './../src/prisma';
import seedDatabase from './utils/seedDatabase';

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Heitor",
                    email: "heitor22@gmail.com",
                    password: "12345678"
                }
            ){
                token,
                user{
                    id
                }
            }
        }
    `
    const response = await client.mutate({
        mutation: createUser
    });

    const userExists = await prisma.exists.User({
        id: response.data.createUser.user.id
    });

    expect(userExists).toBe(true);

});

test('Should expose public author profile', async () => {
    const getUsers = gql`
        query{
            users{
                id
                name
                email
            }
        }
    `
    const response = await client.query({query:getUsers});
    
    expect(response.data.users.length).toBe(1);
    expect(response.data.users[0].email).toBe(null);
    expect(response.data.users[0].name).toBe('Jen');

}); 


test('Should not login with bad credentials', async () => {     
    const login = gql`         
        mutation {             
            login(                                     
                email: "jen@gmail.com",                     
                password: "12345678"                           
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
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Daniela"
                    email:"dany@gmail.com",
                    password: "1234567"
                }
            ){
                token
            }
        }
    `
    await expect(
        client.mutate({
            mutation: createUser
        })
    ).rejects.toThrow();
});
