import uuidv4 from 'uuid/v4';

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
        if(userIdx < 0) throw Error ('User not found');
        
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

    createPost(parent,args,{db},info) {
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
        return post;
    },
    deletePost(parente,args,{db},info){
        const postIndex = db.posts.findIndex((post,index) => {
            return post.id == args.id;
        });
        if(postIndex < 0) throw Error('Post not found');
        const post = db.posts.splice(postIndex,1)[0];
        db.comments = db.comments.filter((comment,index) => comment.post !== args.id);

        return post;
    },
    createComment(parent,args,{db},info) {
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

        return comment;
    },
    deleteComment(parent, args, {db}, info) {
        const commentIndex = db.comments.findIndex((comment,index) => comment.id === args.id);
        
        if(commentIndex < 0) throw Error('Comment not found');

        const comment = db.comments.splice(commentIndex,1)[0];
        
        return comment;
    }
}

export default Mutation;