import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


export default function CreateListing() {

const {currentUser} = useSelector(state => state.user)

const [formData, setFormData] = useState({
  name:'',
  description: '',
  address: '',
  regularPrice: 50,
  bathrooms:1,
  bedrooms:1,
  furnished:true,
  parking: true,
  type:'rent',

});
const [error, setError] = useState(false)
const [loading,setLoading]  = useState(false)
const [success, setSuccess] = useState(false)
const params = useParams();
const navigate = useNavigate()

const handleChange = (e) =>{
  if(e.target.id === 'sale' || e.target.id === 'rent'){
   setFormData({
      ...formData,
      type : e.target.id
    })
  }

  if(e.target.id === 'parking' || e.target.id === 'furnished'){
    setFormData({
      ...formData,
      [e.target.id]:e.target.checked
    })
  }

  if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea' ){
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

}

const handleSubmit = async(e) => {
  e.preventDefault();
  setLoading(true)
  try {
    const res = await fetch(`/api/listing/edit/${params.listingId}`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        ...formData,
        userRef: currentUser._id,

      })
    })

    const data = await res.json()

    if(data.success === false){
      setLoading(false)
      setError(true)
      return;
    }

    setLoading(false);
    setError(false)
    setSuccess(true)
    navigate(`/listing/${data._id}`)
    console.log(data);
    

  } catch (error) {
    console.log(error);
    
  }
}

 useEffect(()=>{

  const fetchListing = async()=>{
    const listingId = params.listingId
    const res = await fetch(`/api/listing/get/${listingId}`)
    const data = await res.json()
      if(data.success === false){
        console.log(data.message);
        return
        
      }
    setFormData(data)
   
  }
  fetchListing()
 },[params.listingId])

  return (
    <main className='p-3 max-w-3xl mx-auto'>
   
    <h1 className='text-3xl font-semibold text-center my-7'>Update Listing</h1>
    <form onSubmit={handleSubmit} className='flex flex-col'>
    {/* kontainer za unos podataka */}
      <div className='flex flex-col gap-4 flex-1'>
      
        <input type='text' placeholder='Name' id='name' className='border p-3 rounded-lg' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name}/>
        <textarea type='textarea' placeholder='Description' id='description' className='border p-3 rounded-lg' required onChange={handleChange} value={formData.description} />
        <input type='text' placeholder='Address' id='address' className='border p-3 rounded-lg' required onChange={handleChange} value={formData.address}/>
     {/* kontainer sa check box-om */}
     <div className='flex justify-between flex-wrap'>
        <div className='flex gap-2'>
          <input type='checkbox' id='sale' className='w-5' onChange={handleChange}  checked={formData.type === 'sale'}/>
          <span>Sell</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='rent' className='w-5' onChange={handleChange}  checked={formData.type === 'rent'}/>
          <span>Rent</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='parking' className='w-5' onChange={handleChange}  checked={formData.parking} />
          <span>Parking Spot</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='furnished' className='w-5' onChange={handleChange}  checked={formData.furnished}/>
          <span>Furnished</span>
        </div>
     </div>
     {/* kontainer za unos soba i kupatila i cijene  */}
     <div className='flex flex-wrap gap-3 sm:flex-row justify-between'>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10' required id='bedrooms' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.bedrooms} />
          <span>Beds</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10' required id='bathrooms' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.bathrooms} />
          <span>Bathrooms</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='100000000' required  id='regularPrice' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.regularPrice} />
          <div className='flex flex-col items-center'>
          <span>Regular Price</span> 
          <span> $ </span> 
          </div>
          
        </div>
        
     </div>
     
      </div>
     
     <button className='mt-7 p-3 bg-blue-600 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>
     {loading ? 'Loading' : 'Update Listing'} 
     </button>

    </form>


    {error ? <p className="mt-5 text-red-700">{error.message}</p> : ''}
    {success ? <p className="mt-5 text-green-700">Listing is successfully saved in DB </p> : ''}
    
    
    
    
    
    </main>
  )
}
