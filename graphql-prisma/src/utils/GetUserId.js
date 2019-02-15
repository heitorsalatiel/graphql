import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {
    //The first one is the header for Query and Mutation. In other hand the second one is for Subscription
    const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;
    if(header){
        const codeToken = header.replace('Bearer ','');
        const decoded = jwt.verify(codeToken,'thisisasecret');
        return decoded.id;
    } 
    
    if(requireAuth) throw new Error('Authentication Required');

    return null;
}

export default getUserId; 