import jwt from 'jsonwebtoken'
import { handleError } from './error.js';

export const verifyToken = (req,res,next)=>{
  const token = req.cookies.access_token;
  if (!token) return next(handleError(401, 'You are not autorized'))

    jwt.verify(token,process.env.TOKEN, (err,user) => {
        if(err) return next(handleError(402,'Forbiden'))

            req.user = user;
            next();
    })

}