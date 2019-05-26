import getUserId from '../utils/GetUserId';
import prisma from '../prisma';

const User = {
    email: {
        fragment:'fragment userId on User{ id }',
        resolve(parent,args,{request},info) {
            const userId = getUserId(request, false);
            return (userId && userId === parent.id) ?  parent.email : null;
        }
    }
}

export default User;