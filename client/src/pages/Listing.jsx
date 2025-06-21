import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function Listing() {

const params = useParams();
const [listingData, setListingData] = useState({});

useEffect(()=>{

    const fetchListing = async() =>{
        const listingId = params.listingId
        console.log(listingId);
        
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json()
        if(data.success === false){
            console.log(data.message);
            return;
        }

        setListingData(data)
        
        
    }


    fetchListing();

},[params.listingId])

console.log(listingData);

  return (
    <>
    <h1>{listingData.name}</h1>
    <div>{listingData.description}</div>
    <div>{listingData.address}</div>
  
    <div>{listingData.regularPrice}</div>
    </>
  )
}
