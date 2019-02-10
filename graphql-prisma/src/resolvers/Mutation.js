import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import GetUserId from './../utils/GetUserId';

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
            token: jwt.sign({userId:user.id},'thisisasecret')
        };

    },

    async deleteUser(parent, args, {prisma}, info) {

        const user = await prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        },info)

        return user;
        
    },
    async updateUser(parent, {id,data}, {prisma}, info) {

        return prisma.mutation.updateUser({
            where: {
                id:id
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
    async deletePost(parente,{id},{prisma},info){
        return prisma.mutation.deletePost({
            where: {
                id:id
            }
        }, info); 
    },
    async updatePost(parent,{id,data},{prisma},info) {

        return prisma.mutation.updatePost({
            where: {
                id:id
            },
            data:data
        }, info)

    },
    async createComment(parent,{data},{prisma},info) {
        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect:{
                        id: data.author
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
    async deleteComment(parent, {id}, {prisma}, info) {
        return prisma.mutation.deleteComment({
            where : {
                id: id
            }
        },info)
    },
    async updateComment(parent,{id,data}, {prisma}, info) {
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

        const token = jwt.sign({id:usr.id},'thisisasecret');

        return {
            token,
            user:usr
        };
    }
}

export default Mutation;