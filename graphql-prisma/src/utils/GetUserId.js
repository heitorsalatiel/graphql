import jwt from 'jsonwebtoken';

const getUserId = (request) => {
    const header = request.request.headers.authorization;

    if(!header) throw new Error('Authentication Required');

    const codeToken = header.replace('Bearer ','');
    const decoded = jwt.verify(codeToken,'thisisasecret');
console.log(decoded);
    return decoded.id;
}

export default getUserId; 