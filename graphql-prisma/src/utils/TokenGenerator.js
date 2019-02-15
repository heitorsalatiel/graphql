import jwt from 'jsonwebtoken';

const SignToken = (userId) => {
    return jwt.sign({userId:userId},'thisisasecret',{expiresIn:"7 days"});
} 

export default SignToken;