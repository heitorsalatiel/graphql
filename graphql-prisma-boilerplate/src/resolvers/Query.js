import getUserId from "../utils/GetUserId";

const Query = {
    users(parent, args, {prisma}, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy:args.orderBy
        }
        if(args.query){
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
        }
        return prisma.query.users(opArgs, info);
    },
    async me(parent, args, {prisma, request}, info) {
        const userId = getUserId(request); 
        const user = await prisma.query.user({
            where: {
                id:userId
            }
        },info)

        return user;
    }

}

export default Query;