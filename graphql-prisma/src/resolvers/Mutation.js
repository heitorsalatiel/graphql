import uuidv4 from 'uuid/v4';

const Mutation = {
    async createUser(parent, args, {prisma}, info) {
        const user = await prisma.mutation.createUser({
            data: args.data
        }, info)

        return user;
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
    async createPost(parent,{data},{prisma},info) {
        console.log(data);
       return prisma.mutation.createPost({
            data: {
                title: data.title,
                body: data.body,
                published: data.published,
                author: {
                    connect : {
                        id: data.author
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
        }) 
    },
    async updatePost(parent,{id,data},{prisma},info) {

        return prisma.mutation.updatePost({
            where: {
                id:id
            },
            data:data
        })

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
    }   
}

export default Mutation;