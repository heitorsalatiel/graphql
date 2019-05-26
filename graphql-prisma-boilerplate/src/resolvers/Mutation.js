import bcrypt from 'bcryptjs';
import GetUserId from './../utils/GetUserId';
import SignToken from './../utils/TokenGenerator';
import HashPassword from './../utils/HashPassword';

const Mutation = {
    async createUser(parent, args, {prisma}, info) {
        const userData = {...args.data};
        const password = await HashPassword(userData.password);
    
        const user = await prisma.mutation.createUser({
            data: {
                ...userData,
                password
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

        if(typeof data.password === 'string') data.password = await HashPassword(data.password);
    
        return prisma.mutation.updateUser({
            where: {
                id:userId
            },
            data: data

        }, info)
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