import Listing from "../models/listing.model.js"
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


export const deleteUser = async(req,res,next) => {
    if(req.user.id !== req.params.id){
        return next(handleError(402,'You are not permited to delete account'))
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        
        res.clearCookie('access_token')
        res.status(200).json('user Deleted')
        
    } catch (error) {
        console.log(error);
        
    }
}


export const getUserListings = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(handleError(401,'You can not see listings'))
    }
    try {
      const listing =  await Listing.find({userRef:req.params.id})  
      res.status(200).json(listing)
    } catch (error) {
        console.log(error);
        
    }
}