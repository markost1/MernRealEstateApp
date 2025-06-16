import Listing from "../models/listing.model.js";

export const createListing = async (req,res,next) =>{
   
   const newListing = await Listing.create(req.body)
    try {
        await newListing.save();
        res.status(200).json({message: 'Listing is successfully saved in DB '})

        
    } catch (error) {
       console.log(error);
       
    }
    
}