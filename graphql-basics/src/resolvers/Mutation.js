import uuidv4 from 'uuid/v4';
import { PubSub } from 'graphql-yoga';

const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken = db.users.some((user,index) => {
            return user.email === args.data.email;
        });

        if (emailTaken) {
            throw new Error('Email already taken');
        }
        
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user);
        
        return user;

    },

    deleteUser(parent, args, {db}, info) {
        const userIdx = db.users.findIndex((user,index) => user.id === args.id);
        if(userIdx < 0) throw new Error ('User not found');
        
        const deletedUser = db.users.splice(userIdx,1)[0];

        posts = db.posts.filter((post,index) => {
            const match = post.author === args.id
            if(match){
                db.comments = db.comments.filter((comment,idx) => {
                    return comment.post !== post.id;
                });
            }
            return !match
        });
        db.comments = db.comments.filter((comment,index) => comment.author !== args.id);

        return deletedUser;
        
    },
    updateUser(parent, {id,data}, {db}, info) {
        let user = db.users.find((user,index) => {
            return user.id === id
        });
        if(!user) throw Error('User not found');

        if(typeof data.email === 'string'){
            const emailTaken = db.users.some((user,index) => user.email === data.email)
            if(emailTaken) throw new Error('This email was already taken');
            user.email = data.email
        }

        if(typeof data.name === 'string'){
            user.name = data.name
        }

        if(typeof data.age !== 'undefined'){
            user.age = data.age;
        }
        return user;
    },
    createPost(parent,args,{db, pubSub},info) {
        const userExist = db.users.some((user,index) => {
            return user.id === args.data.author;
        });

        if(!userExist) {
            throw new Error('User not found');
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post);
        if(post.published) {
            pubSub.publish(`post`,{post});
        }
        return post;
    },
    deletePost(parente,args,{db},info){
        const postIndex = db.posts.findIndex((post,index) => {
            return post.id == args.id;
        });
        if(postIndex < 0) throw new Error('Post not found');
        const post = db.posts.splice(postIndex,1)[0];
        db.comments = db.comments.filter((comment,index) => comment.post !== args.id);

        return post;
    },
    updatePost(parent,{id,data},{db},info) {
        let post = db.posts.find((post,index) => {
            return post.id === id;
        });
        if(!post) throw new Error('Post not found');
        if(typeof data.title === 'string') {
            post.title = data.title;
        }
        if(typeof data.body === 'string') {
            post.body = data.body;
        }
        if(typeof data.published === 'boolean') {
            post.published = data.published;
        }

        return post;
    },
    createComment(parent,args,{db, pubSub},info) {
        const userExists = db.users.some((user,index) => {
            return user.id === args.data.author
        });

        const postExists = db.posts.find((post,index) => {
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

        db.comments.push(comment);
        pubSub.publish(`comment ${args.data.post}`,{comment});

        return comment;
    },
    deleteComment(parent, args, {db}, info) {
        const commentIndex = db.comments.findIndex((comment,index) => comment.id === args.id);
        
        if(commentIndex < 0) throw new Error('Comment not found');

        const comment = db.comments.splice(commentIndex,1)[0];
        
        return comment;
    },
    updateComment(parent,{id,data}, {db}, info) {
        let comment = db.comments.find((comment,index) => {
            return comment.id === id;
        });

        if(!comment) throw Error('Comment not found');
        if(typeof data.text === 'string') {
            comment.text = data.text;
        }

        return comment;
    }
}

export default Mutation;