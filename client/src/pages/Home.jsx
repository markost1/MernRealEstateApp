import { useState } from "react"
import { useEffect } from "react"
import home from '../assets/home.jpg'
import { MdCropFree } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdEuro } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import LocationComp from "../components/LocationComp";
import { useNavigate } from "react-router-dom";
import TypeComp from "../components/TypeComp";
import CategoryComp from "../components/CategoryComp";




export default function Home() {
const [searchParams,setSearchParams] = useSearchParams()
const pageParam = parseInt(searchParams.get("page")) || 1;

const [currentPage,setCurrentPage] = useState(pageParam)
const [totalPages,setTotalPages] = useState(1)
const [showListings, setShowListings] = useState([])
const[formData,setFormData] = useState({
  location:[],
  type:'all',
  category:[],
})
const navigate = useNavigate()

useEffect(()=>{

const fetchData = async() =>{
  
  //console.log('funkcija radi');
  try {
  const res = await fetch(`/api/listing/get?limit=6&page=${currentPage}`,{
      method:'GET'
  })
  
  const data = await res.json()
  
  if (data.success === false) {
      console.log(data.message);
    }
    
    setShowListings(data.listings)
    setTotalPages(Math.ceil(data.totalCount / 6))
    
    
  } catch (error) {
    console.log(error.message);
    
  }
}


fetchData()

},[currentPage])

useEffect(()=>{
  console.log('podaci su ucitani',showListings);
  
},[showListings])


const handlePageChange = (page)=>{
  setSearchParams({page})
  setCurrentPage(page)
}

console.log(formData);

const handleSubmit = (e)=>{
  e.preventDefault()

  const urlParams =  new URLSearchParams()

  if(formData.location.length > 0 ){
    urlParams.set('location', formData.location.join(','))
    
  }

  if(formData.type){
    urlParams.set('type',formData.type)
  }

if(formData.category.length > 0){
  urlParams.set('category', formData.category.join(','))
}

  const searchQuery = urlParams.toString();

  navigate(`/search?${searchQuery}&&limit=100`)

}

return (
  <div>    

  {/* filter */}
  <div className="py-6 ">
    <form  onSubmit={handleSubmit} className="flex flex-col justify-center">
      <LocationComp formData={formData}  setFormData={setFormData}/>
      <TypeComp formData={formData} setFormData={setFormData} />
      <CategoryComp formData={formData} setFormData={setFormData} />
      <button className="border rounded-lg p-3">Search</button>
    </form>
  </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-4">
      {showListings && showListings.length > 0 ? showListings.map((listing) => (
        <Link key={listing._id} to={`/listing/${listing._id}`}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden relative min-h-[420px] hover:shadow-lg transition">
            <img src={home} alt="image" className="w-full h-48 object-cover" />
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
      )) : null}
    </div>

    {showListings && showListings.length > 0 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    )}
  </div>
);
}