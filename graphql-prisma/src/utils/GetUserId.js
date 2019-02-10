import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {

    const header = request.request.headers.authorization;

    if(header){
        const codeToken = header.replace('Bearer ','');
        const decoded = jwt.verify(codeToken,'thisisasecret');
        return decoded.id;
    } 
    
    if(requireAuth) throw new Error('Authentication Required');

    return null;
}

export default getUserId; 