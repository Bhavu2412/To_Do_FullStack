// use this when ever to verify if user is there or not
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports  = async(req,res,next)=>{
    const authHeader =  req.get('Authorization');
    if(!authHeader){
        const err = new Error('No user found');
        err.statusCode = 400;
        throw err;
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = await jwt.verify(token , process.env.SECRET_KEY);
    try{
        if(!decodedToken){
            const err = new Error('No User found!!!');
            err.statusCode = 400;
            throw err;
        }
        req.userId = decodedToken.userId;
       
        next();
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err); 
    }
    
}