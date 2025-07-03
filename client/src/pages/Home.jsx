import { useState } from "react"
import { useEffect } from "react"


export default function Home() {
const [showListings, setShowListings] = useState({})

useEffect(()=>{

const fetchData = async() =>{
  
  //console.log('funkcija radi');
  try {
  const res = await fetch('/api/listing/get?limit=100',{
      method:'GET'
  })
  
  const data = await res.json()
  
  if (data.success === false) {
      console.log(data.message);
    }
    
    setShowListings(data.listings)
    
    
  } catch (error) {
    console.log(error.message);
    
  }
}


fetchData()

},[])

useEffect(()=>{
  console.log('podaci su ucitani',showListings);
  
},[showListings])

  return (
    <div>
      {showListings && showListings.length > 0 ? showListings.map((listing)=>{
       return <p key={listing._id}>{listing._id}</p>
      }) : null }
    </div>
  )
}
