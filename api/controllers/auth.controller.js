import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
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