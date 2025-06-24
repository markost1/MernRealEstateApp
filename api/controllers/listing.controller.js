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

export const getListings =async (req,res,next) =>{
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const typeParam = req.query.type;
        const typeFilter =
         typeParam === undefined || typeParam === 'all'
        ? { $in: ['sale', 'rent'] }
        : typeParam;


        const searchTerm = req.query.searchTerm || '';

        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

          let categoryFilter;
    if (req.query.category) {
      const categories = req.query.category.split(',').map(c => c.trim());
      categoryFilter = { $in: categories };
    } else {
      categoryFilter = { $exists: true }; // Ne filtrira po kategoriji
    }


        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

         const listings = await Listing.find({
            name:{$regex:searchTerm, $options:'i'},
            type:typeFilter,
            regularPrice:{$gte:minPrice, $lte:maxPrice},
            category: categoryFilter,
         }).sort({
            [sort]:order
         }).limit(limit)
         .skip(startIndex)

         return res.status(200).json(listings)

        
    } catch (error) {
        return next(handleError(500,'Server error while fetching listings'));
    }
}