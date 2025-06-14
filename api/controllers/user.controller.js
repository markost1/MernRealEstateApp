import User from "../models/user.model.js"
import { handleError } from "../utils/error.js"
import bcrypt from "bcryptjs"

export const test = (req,res)=>{
    res.send('POZDRAV SVIMA OVA RUTA RADI')
}

export const test2 = (req,res)=>{
    res.json(
        {message:"hello"}
    )
}
  

export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) {
        return next(handleError(401,'You are not allowed to change data'))
    }

    try {
        if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password,10)
    } ;

    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
        }
    },{new:true});

    const {password, ...rest} = updatedUser._doc

    res.status(200).json(rest)


    } catch (error) {
        next(error)
        
    }

}
