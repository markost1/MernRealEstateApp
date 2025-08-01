import mongoose from 'mongoose'

const arrayLimit = (val) =>{
    return val.length <= 10
}

const listingSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    category:{
        type:[String],
        enum:['Apartment','House','Villas','Land','Commercial','Hotels','Garage'],
        // required:true,
    },
    location:{
        type:[String],
    },
    regularPrice:{
        type:Number,
        required:true,
    },
    // discountPrice:{
    //     type:Number,
    //     required:true,
    // },
    bathrooms:{
        type:Number,
        required:true,
    },
    bedrooms:{
        type:Number,
        required:true,
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parking:{
        type:Boolean,
        
    },
    type:{
        type:String,
        required:true,
    },
    // offer:{
    //     type: Boolean,
    //     required:true,
    // },
    imageUrls:{
        type:[String],
        required:true,
        validate:{
            validator:arrayLimit,
            message:"You can not upload more then 10 images"
        },
    },
    floor:{
    type:Number,
    },
    area:{
    type:Number,
   // required:true,
    },
    landArea:{
        type:Number,
    },
     swimingPool:{
        type:Boolean
    },
     airCondition:{
        type:Boolean
    },
     seaView:{
        type:Boolean
    },
     montainView:{
        type:Boolean
    },
    balcony:{
        type:Number,
    },
    userRef:{
        type:String,
        required:true,
    },
   
},
    {timestamps:true}
)

const Listing = mongoose.model('Listing', listingSchema)

export default Listing;