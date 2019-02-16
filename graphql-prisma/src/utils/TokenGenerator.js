import jwt from 'jsonwebtoken';

const SignToken = (id) => {
    return jwt.sign({ userId:id },'thisisasecret',{expiresIn:"7 days"});
} 

export default SignToken;