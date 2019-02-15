import bcrypt from 'bcryptjs';
import GetUserId from './../utils/GetUserId';
import SignToken from './../utils/TokenGenerator';

const Mutation = {
    async createUser(parent, args, {prisma}, info) {
        const userData = {...args.data};
        const password = userData.password;
        if(password.length < 8) {
            throw new Error(`Password must be 8 characters long at least...`);
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await prisma.mutation.createUser({
            data: {
                ...userData,
                password:hashPassword
            }
        })
        

        return {
            user,
            token: SignToken(user.id)
        };

    },

    async deleteUser(parent, args, {prisma,request}, info) {
        const userId = GetUserId(request);
        const user = await prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        },info)

        return user;
        
    },
    async updateUser(parent, {id,data}, {prisma,request}, info) {
        const userId = GetUserId(request);

        return prisma.mutation.updateUser({
            where: {
                id:userId
            },
            data: data

        }, info)
    },
    async createPost(parent,{data},{prisma, request},info) {

       const userId = GetUserId(request);

       return prisma.mutation.createPost({
            data: {
                title: data.title,
                body: data.body,
                published: data.published,
                author: {
                    connect : {
                        id: userId
                    }
                }
            }
       },info)
    },
    async deletePost(parente,{id},{prisma,request},info){

        const userId = GetUserId(request);
        const postExist = await prisma.exists.Post({
            id: id,
            author: {
                id: userId
            }
        });

        if(!postExist) throw new Error('Unable to delete post');

        return prisma.mutation.deletePost({
            where: {
                id:id
            }
        }, info); 
    },
    async updatePost(parent,{id,data},{prisma, request},info) {
        
        const userId = GetUserId(request);
        const postExist = await prisma.exists.Post({
            id: id,
            author: {
                id: userId
            }
        });
        if(!postExist) throw new Error('Unable to update post');
        

        const isPublished = await prisma.query.posts({id: id, published:true});
        if(isPublished && !data.published) {
            await prisma.mutation.deleteManyComments({
                where:{
                    post: {
                        id: id
                    }
                }    
            });
        }

        return prisma.mutation.updatePost({
            where: {
                id:id
            },
            data:data
        }, info)

    },
    async createComment(parent,{data},{prisma,request},info) {

        const userId = GetUserId(request);
        const postExists = await prisma.exists.Post({
            id:data.post, 
            published:true
        });
        if(!postExists) throw new Error('Unable to find post');
        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect:{
                        id: userId
                    } 
                },
                post: {
                    connect:{
                        id: data.post
                    }
                }
            }
        },info)
    },
    async deleteComment(parent, {id}, {prisma, request}, info) {

        const userId = GetUserId(request);
        const  commentExist = await prisma.exists.Comment({
            id:id,
            author: {
                id:userId
            }
        });

        if(!commentExist) throw new Error('Unable to delete comment');

        return prisma.mutation.deleteComment({
            where : {
                id: id
            }
        },info)
    },
    async updateComment(parent,{id,data}, {prisma, request}, info) {
        const userId = GetUserId(request);
        const  commentExist = await prisma.exists.Comment({
            id:id,
            author: {
                id:userId
            }
        });

        if(!commentExist) throw new Error('Unable to update comment');

        return prisma.mutation.updateComment({
            where: {
                id:id
            },
            data:data
        },info)
    },
    
    async login(parent,{email,password},{prisma},info) {

        const usr = await prisma.query.user({
            where:{
                email:email
            }
        });

        if(!usr) throw new Error('Unable to login!');
        const isLoginSuccessful = await bcrypt.compare(password, usr.password);
        if(!isLoginSuccessful) throw new Error('Unable to login!');

        const token = SignToken(usr.id);

        return {
            token,
            user:usr
        };
    }
}

export default Mutation;