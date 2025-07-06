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


export const getListings = async (req, res, next) => {
  try {

    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;
    const skip = (page-1)*limit

    // Osnovni filter objekat koji ćemo postepeno puniti
    const filters = {};

    // TYPE filter
    const typeParam = req.query.type;
    if (typeParam && typeParam !== 'all') {
      filters.type = typeParam; // npr. 'sale' ili 'rent'
    }

    // SEARCH (pretraga po imenu)
    const searchTerm = req.query.searchTerm || '';
    if (searchTerm) {
      filters.name = { $regex: searchTerm, $options: 'i' };
    }

    // Cijena
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
    filters.regularPrice = { $gte: minPrice, $lte: maxPrice };

    // Kategorija
    if (req.query.category) {
      const categories = req.query.category.split(',').map(c => c.trim());
      if (categories.length > 0) {
        filters.category = { $in: categories };
      }
    }

    // Lokacija
    if (req.query.location) {
      const locations = req.query.location.split(',').map(l => l.trim());
      if (locations.length > 0) {
        filters.location = { $in: locations };
      }
    }

    // Broj soba
    if (req.query.bedrooms) {
      const bedrooms = req.query.bedrooms
        .split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));
      if (bedrooms.length > 0) {
        filters.bedrooms = { $in: bedrooms };
      }
    }

    // Sortiranje
    const sortField = req.query.sort || 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    // DEBUG log -  šta se zaista šalje ka MongoDB
    console.log('Primijenjeni filteri:', filters);

    // Ukupan broj rezultata (za paginaciju)
    const totalCount = await Listing.countDocuments(filters);

    // Pravi upit
    const listings = await Listing.find(filters)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      totalCount,
      totalPages:Math.ceil(totalCount / limit),
      currentPage:page,
      listings,
    });

  } catch (error) {
    
    console.log('getListings Greska' , error);
    return next(handleError(500, 'Server error while fetching listings'));
  }
};
