import 'cross-fetch/polyfill';
import seedDatabase,{userOne,postOne,postTwo} from './utils/seedDatabase';
import getClient from './utils/getClient';
import prisma from './../src/prisma';
import {getPosts, myPost, updatePost, createPost, deletePost, subscribeToPosts} from './utils/operations';
const client = getClient();

beforeAll(() => {
    jest.setTimeout(10000); 
});
beforeEach(seedDatabase);

test('Should expose only published posts', async() => {

    const response = await client.query({query:getPosts});
    expect(response.data.posts.length).toBe(2);
    expect(response.data.posts[0].published).toBe(true);

});

test('Should fetch a user post', async () => {
    const client = getClient(userOne.jwt);

    const {data} = await client.query({query:myPost});
    expect(data.myPosts.length).toBe(2);
    data.myPosts.forEach((post,index) => {
        expect(post.author.id).toBe(userOne.user.id);
    })
});

test('Should be able to update own post', async () => {
    const client  = getClient(userOne.jwt);
    const variables = {
        id: postOne.post.id,
        data: {
            published: false
        }
    }
    
    const {data} = await client.mutate({mutation: updatePost, variables});
    const exists = await prisma.exists.Post({id: postOne.post.id, published: false});
    expect(exists).toBe(true);
    expect(data.updatePost.published).toBe(false);
});

test('Should create a post', async() => {
    const client = getClient(userOne.jwt);
    const variables = {
        data: {
            title: "Test Post Title",
            body: "Test Post Body",
            published: true
        }
    }
    
    const {data} = await client.mutate({mutation: createPost, variables});
    expect(data.createPost.title).toBe("Test Post Title");
    expect(data.createPost.body).toBe("Test Post Body");
    expect(data.createPost.published).toBe(true);
});

test('Should delete a post', async() => {
    const client = getClient(userOne.jwt);
    const variables = {
        id:postTwo.post.id
    }

    await client.mutate({mutation: deletePost, variables});
    const exists = await prisma.exists.Post({id: postTwo.post.id});
    expect(exists).toBe(false);
});

test('Should subscribe for post changes', async () => {

	client.subscribe({query:subscribeToPosts}).subscribe({
		next(response) {
			expect(response.data.post.mutation).toBe('DELETED');
			done();
		}
	})

	//Chnage a comment
	await prisma.mutation.deletePost({where:{id:postOne.post.id}})
})

