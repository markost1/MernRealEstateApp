import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
//import home from '../assets/home.jpg'
import { CiLocationOn } from 'react-icons/ci'
import { MdCropFree, MdEuro } from 'react-icons/md'
import Pagination from '../components/Pagination'
import LocationComp from '../components/LocationComp'
import TypeComp from '../components/TypeComp'
import CategoryComp from '../components/CategoryComp'
import MinMaxPriceComp from '../components/MinMaxPriceComp'
import BedroomsComp from '../components/BedroomsComp'
import Footer from '../components/Footer'

export default function Search() {
    
    const [searchParams,setSearchParams] = useSearchParams()
    const pageParam = parseInt(searchParams.get("page")) || 1;
    const[listings,setListings] = useState([])
   // const [currentPage,setCurrentPage] = useState(pageParam)
    const [totalPages,setTotalPages] = useState(1)
    const[formData,setFormData] = useState({
  location:[],
  type:'all',
  category:[],
  minPrice:1,
  maxPrice:1000000000,
  bedrooms:[],
})

const navigate = useNavigate()


//     useEffect(()=>{

// const fetchData = async() =>{
  
//   //console.log('funkcija radi');
//   try {
//     const queryString = searchParams.toString();
//   const res = await fetch(`/api/listing/get?page=${queryString}`,{
//       method:'GET'
//   })
  
//   const data = await res.json()
  
//   if (data.success === false) {
//       console.log(data.message);
//       return;
//     }
    
//     setListings(data.listings)
//     setTotalPages(Math.ceil(data.totalCount / 6))
    
    
//   } catch (error) {
//     console.log(error.message);
    
//   }
// }


// fetchData()

// },[searchParams])
useEffect(() => {
  const fetchListings = async () => {
    const params = new URLSearchParams(searchParams);

    let changed = false;
    if (!params.has('page')) {
      params.set('page', 1);
      changed = true;
    }

    if (!params.has('limit')) {
      params.set('limit', 6);
      changed = true;
    }

    if(changed){
      setSearchParams(params)
      return;
    }

    const queryString = params.toString(); 

    try {
      const res = await fetch(`/api/listing/get?${queryString}`);
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setListings(data.listings);
      setTotalPages(Math.ceil(data.totalCount / 6));
    } catch (error) {
      console.error('Greška:', error.message);
    }
  };

  fetchListings();
}, [searchParams, setSearchParams]);

useEffect(()=>{
  console.log('podaci su ucitani',listings);
  
},[listings])


const handlePageChange = (page)=>{
  setSearchParams((prev)=>{
    const params = new URLSearchParams(prev)
    params.set('page',page)
    return params
  })
  
}
    




        console.log(listings);

        const handleSubmit = (e)=>{
  e.preventDefault()

  const urlParams =  new URLSearchParams()

  if(formData.location.length > 0 ){
    urlParams.set('location', formData.location.join(','))
    
  }

if(formData.type && formData.type !== 'all'){
    urlParams.set('type',formData.type)
  }

if(formData.category.length > 0){
  urlParams.set('category', formData.category.join(','))
}

if(formData.minPrice){
  urlParams.set('minPrice', formData.minPrice)
}
if(formData.maxPrice){
  urlParams.set('maxPrice', formData.maxPrice)
}

if(formData.bedrooms.length > 0){
  urlParams.set('bedrooms',formData.bedrooms)
}

  const searchQuery = urlParams.toString();

  navigate(`/search?${searchQuery}`)

}
        

  return (
    
    <div>
     {/* filter */}
      <div className="flex justify-center items-center">
      <div className="py-6 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-center p-3 font-semibold text-xl ">Pretraga Nekretnina</h1>
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto md:max-w-none md:flex-row md:flex-wrap md:justify-center"
    >
        <div className="w-full md:max-w-[48%] lg:max-w-[32%]">
          <LocationComp formData={formData}  setFormData={setFormData}/>
        </div>
        <div className="w-full md:max-w-[48%] lg:max-w-[32%]">
    
          <TypeComp formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-full md:max-w-[48%] lg:max-w-[32%]">
    
          <CategoryComp formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-full md:max-w-[48%] lg:max-w-[32%]">
          <MinMaxPriceComp formData={formData} setFormData={setFormData} />
    
        </div>
        <div className="w-full md:max-w-[48%] lg:max-w-[32%]">
          <BedroomsComp formData={formData} setFormData={setFormData}/>
    
        </div>
    
        <div className="w-full md:max-w-[48%] lg:max-w-[32%] flex items-center">
          <button className=" w-full max-w-md border rounded-lg p-3 bg-blue-600 text-white uppercase hover:opacity-90">
          Search
          </button>
    
        </div>
        </form>
      </div>
      </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-4">
   {
    listings && listings.length > 0 ? 
    listings.map((listing)=>(
        <Link key={listing._id} to={`/listing/${listing._id}`}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden relative min-h-[420px] hover:shadow-lg transition">
            <img src={listing.imageUrls[0]} alt="image" className="w-full h-48 object-cover" />
            <span className="absolute top-3 left-5 bg-blue-600 p-2 text-white rounded-lg uppercase">
              For {listing.type}
            </span>
            <div className="p-4">
              <h2 className="text-lg font-semibold line-clamp-2">{listing.name}</h2>
              <span className="flex gap-2 items-center mt-3">
                <CiLocationOn />
                <p className="font-semibold">{listing.location}</p>
              </span>
              <span className="flex gap-2 items-center mt-3">
                <p className="text-lg font-semibold">{listing.regularPrice}</p>
                <MdEuro />
              </span>
            </div>
            <div className="p-3">
              <span className="flex gap-2 items-center">
                <MdCropFree />
                {listing.area} m2
              </span>
            </div>
          </div>
        </Link>
    )):'There is no listings'}
    </div>
  {listings && listings.length > 0 && (
        <Pagination
          currentPage={pageParam}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <Footer />

</div>
)
  
}
