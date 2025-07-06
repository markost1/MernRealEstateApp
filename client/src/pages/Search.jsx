import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Search() {
    const [searchParams] = useSearchParams()
    const[listings,setListings] = useState([])

    useEffect(()=>{
        const fetchFilteredListings =  async()=>{
            const queryString = searchParams.toString()

            const res = await fetch(`/api/listing/get?${queryString}`)
            const data = await res.json();
            setListings(data.listings)
        }

        fetchFilteredListings()

    },[searchParams])

        console.log(listings);
        

  return (
    <div>Search</div>
  )
}
