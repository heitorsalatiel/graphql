import jwt from 'jsonwebtoken';

const getUserId = (request) => {
    const header = request.request.headers.authorization;

    if(!header) throw new Error('Authentication Required');

    const codeToken = header.replace('Bearer ','');
    const decoded = jwt.verify(codeToken,'thisisasecret');

    return decoded.userId;
}

export default getUserId; 