import prisma from './../../src/prisma';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();
    const createdUser = await prisma.mutation.createUser({
        data: {
            name: "Jen",
            email: "jen@gmail.com",
            password: bcrypt.hashSync("1234567")
        }
    });
    await prisma.mutation.createPost({
        data: {
            title: 'Automatic Post Test',
            body: 'Created a test to run Test Automations',
            published: true,
            author: {
                connect:{
                    id: createdUser.id
                }
            }
        }
    });
    await prisma.mutation.createPost({
        data: {
            title: 'Automatic Post Test 2',
            body: 'Created a test to run Test Automations 2',
            published: false,
            author: {
                connect:{
                    id: createdUser.id
                }
            }
        }
    });
}

export default seedDatabase;