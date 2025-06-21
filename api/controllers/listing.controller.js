import Listing from "../models/listing.model.js";
import { handleError } from "../utils/error.js";

export const createListing = async (req,res,next) =>{
   
   const newListing = await Listing.create(req.body)
    try {
        await newListing.save();
        res.status(200).json(newListing)

        
    } catch (error) {
       console.log(error);
       
    }
    
}

export const deleteListing =async (req,res,next) => {
        
    // listing sa odredjenim id-jem smijestam u prom jenjivu listings radi provjere

    const listing = await Listing.findById(req.params.id)

    //provjera da li listing postoji

    if(!listing){
       return next(handleError(401,'Listing not found'))
    }

    //provjera da li je korisnicki id jednak sa id referencom listinga tj da li je korisnik kreirao listing

    if(req.user.id !== listing.userRef){
        return next(handleError(401,'You can delete only your listing'))
    }
    try {
        //brisanje listinga iz DB 
        await Listing.findByIdAndDelete(req.params.id)
        return res.status(200).json('Listing is successfully deleted')
    } catch (error) {
        next(error)
    }
}


export const editListing = async(req,res,next) => {
    const listing = await Listing.findById(req.params.id)

    if(!listing){
        next(handleError(401,'Listing not found'))
    }

    if(req.user.id !== listing.userRef){
        next(handleError(401,'You can update only your listing'))
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id,req.body,
            {new:true})
            res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}

export const getListing = async(req,res,next)=>{
    
    try {
      const listing = await Listing.findById(req.params.listingId)  
      if (!listing) {
        return next(handleError(401,'Listing not found'))
      }
      return res.status(200).json(listing)
    } catch (error) {
        return next(error)
    }
}

export const getListingData = async(req,res,next) => {
    try {
        const listing = await Listing.findById(req.params.listingId)
        if(!listing){
            return next(handleError(401, 'Listing not found'))
        }
        res.status(200).json(listing)
    } catch (error) {
        return next(error)
    }
}