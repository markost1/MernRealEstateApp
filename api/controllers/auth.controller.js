import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { handleError } from "../utils/error.js";


export const signUp = async (req,res,next) =>{
    const {username,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);

    const newUser = new User({username,email,password:hashedPassword})

    try {
        await newUser.save();
        res.status(200).json({message:'User is successfully saved in DB'})
    } catch (error) {
        //res.status(500).json(error.message)
        //next(error) prosledjujem error
        return next(handleError(500, 'Korisnik sa unesenim podacima vec postoji u bazi')) //ovdje mogu da error.message 
    }
}

export const signIn = async (req,res,next) => {
    const {email,password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(handleError(400,'User not found'))
        
        const validPassword =await bcrypt.compare(password, validUser.password) //povećava skalabilnost servera jer ne blokira event loop
        if(!validPassword) return next(handleError(404,'Wrong Credential'))

        const token = jwt.sign({id:validUser._id},
                                process.env.TOKEN,
                                { expiresIn: '7d',})

        const {password:_, ...rest} = validUser._doc

        return res.cookie('access_token', token, {
            httpOnly:true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  
            }).status(200).json(rest)

    } catch (error) {
        console.log(error);
        return next(handleError(500, 'Server error'));
        
    }
    
}