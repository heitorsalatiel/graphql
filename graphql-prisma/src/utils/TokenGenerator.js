import jwt from 'jsonwebtoken';

const SignToken = (id) => {
    return jwt.sign({ userId:id },process.env.PRISMA_TOKEN_SECRET,{expiresIn:"7 days"});
} 

export default SignToken;