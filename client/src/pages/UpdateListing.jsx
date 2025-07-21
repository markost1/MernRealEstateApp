import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LocationComp from "../components/LocationComp";
import { uploadImageToCloudinary } from "../utils/uploadImages";


export default function UpdateListing() {

const {currentUser} = useSelector(state => state.user)

const [imageFiles, setImageFiles] = useState([]);
const [imageUrls, setImageUrls] = useState([]);
const [existingImageUrl, setExistingImageUrl] = useState([])


const [formData, setFormData] = useState({
  name:'',
  description: '',
  address: '',
  type:'rent',
  area:'',
  landArea:'',
  floor:0,
  bathrooms:0,
  bedrooms:0,
  balcony:0,
  regularPrice: 0,
  furnished:true,
  parking: true,
  montainView:false,
  seaView:false,
  swimingPool:false,
  airCondition:false,
  category:[],
  location:[],
  imageUrls:[],

});
const cloudName = 'dkt3gce6g'
const uploadPreset = 'realEstateApp';
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

  if((e.target.id === 'parking' || 
     e.target.id === 'furnished' ||
     e.target.id === 'montainView'|| 
     e.target.id === 'seaView' || 
     e.target.id === 'swimingPool'|| 
     e.target.id === 'airCondition')){
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

const handleCategoryChange = (e) =>{
  const {value,checked} = e.target;
  if(checked){
    setFormData((prev) =>({
      ...prev,
      category:[...prev.category,value]
    }))
  }else{
    setFormData((prev) =>({
      ...prev,
      category:[...prev.category.filter(cat => cat !== value)]
    }))
  }
}

//za slike
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  if (files.length + imageFiles.length > 10) {
    alert("Maksimalno 10 slika.");
    return;
  }

  const validImages = files.filter(file => file.size <= 2 * 1024 * 1024);

  if (validImages.length !== files.length) {
    alert("Neke slike su veće od 2MB i neće biti dodate.");
  }

  setImageFiles(prev => [...prev, ...validImages]);
};

//za upload
const handleImageUpload = async () => {
  if (imageFiles.length === 0) return;

  try {
    setLoading(true);
    const urls = [];

    for (const file of imageFiles) {
      const imageUrl = await uploadImageToCloudinary(file, cloudName, uploadPreset);

      urls.push(imageUrl);
    }

    setImageUrls(prev => [...prev, ...urls]);
setFormData(prev => ({
  ...prev,
  imageUrls: [...existingImageUrl, ...urls]
}));

    setLoading(false);
  } catch (error) {
    console.log("Greška pri uploadu:", error);
    setLoading(false);
  }
};

//delete
const handleRemoveNewImage = (index) => {
  const updated = imageUrls.filter((_, i) => i !== index);
  setImageUrls(updated);
  setFormData(prev => ({
    ...prev,
    imageUrls: [...existingImageUrl, ...updated], // ažuriraj formData.imageUrls
  }));
};


const handleRemoveExistingImage = (index) => {
  const updatedImages = existingImageUrl.filter((_, i) => i !== index);
  setExistingImageUrl(updatedImages);
  setFormData(prev => ({ ...prev, imageUrls: [...updatedImages, ...imageUrls] }));
};






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
        imageUrls:[...existingImageUrl, ...imageUrls]

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
    setExistingImageUrl(data.imageUrls || [])
   
  }
  fetchListing()
 },[params.listingId])
 console.log(formData);
 

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
          <input type='checkbox' id='swimingPool' className='w-5' onChange={handleChange}  checked={formData.swimingPool} />
          <span>Swiming Pool</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='furnished' className='w-5' onChange={handleChange}  checked={formData.furnished}/>
          <span>Furnished</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='airCondition' className='w-5' onChange={handleChange}  checked={formData.airCondition}/>
          <span>Air Condition</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='seaView' className='w-5' onChange={handleChange}  checked={formData.seaView}/>
          <span>Sea View</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='montainView' className='w-5' onChange={handleChange}  checked={formData.montainView}/>
          <span>Montain View</span>
        </div>
        
     </div>
     <LocationComp formData={formData} setFormData={setFormData}/>
      <div>
      <h2>Category</h2>
       <div className='flex gap-2'>
          <input type='checkbox' id='category-apartment'value='Apartment' className='w-5' onChange={handleCategoryChange}  checked={formData.category.includes('Apartment')}/>
          <span>Apartment</span>
        </div> <div className='flex gap-2'>
          <input type='checkbox' id='category-house'value='House' className='w-5' onChange={handleCategoryChange}  checked={formData.category.includes('House')}/>
          <span>House</span>
        </div> <div className='flex gap-2'>
          <input type='checkbox' id='category-villas' value='Villas' className='w-5' onChange={handleCategoryChange}  checked={formData.category.includes('Villas')}/>
          <span>Villas</span>
        </div> <div className='flex gap-2'>
          <input type='checkbox' id='category-land' value='Land' className='w-5' onChange={handleCategoryChange}  checked={formData.category.includes('Land')}/>
          <span>Land</span>
        </div> <div className='flex gap-2'>
          <input type='checkbox' id='category-commercial'value='Commercial' className='w-5' onChange={handleCategoryChange}  checked={formData.category.includes('Commercial')}/>
          <span>Commercial</span>
        </div> <div className='flex gap-2'>
          <input type='checkbox' id='category-hotels' value='Hotels' className='w-5' onChange={handleCategoryChange}  checked={formData.category.includes('Hotels')}/>
          <span>Hotels</span>
        </div> <div className='flex gap-2'>
          <input type='checkbox' id='category-garage' value='Garage' className='w-5' onChange={handleCategoryChange}  checked={formData.category.includes('Garage')}/>
          <span>Garage</span>
        </div>
    </div>
     {/* kontainer za unos soba i kupatila i cijene  */}
     <div className='flex flex-wrap gap-3 sm:flex-row justify-between'>
       <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10000' required id='area' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.area} />
          <span>Area</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10000000' id='landArea' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.landArea} />
          <span>Land Area</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='20' id='floor' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.floor} />
          <span>Floor</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10' required id='bedrooms' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.bedrooms} />
          <span>Beds</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10' required id='bathrooms' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.bathrooms} />
          <span>Bathrooms</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10' required id='balcony' className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.balcony} />
          <span>Balcony</span>
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
{/* editovanje slika update listing */}
      <div className="flex flex-col gap-4 mt-4">
  <input
    type="file"
    className="border border-gray-300 p-3 rounded-lg"
    id="images"
    accept="image/*"
    multiple
    onChange={handleImageChange}
  />

  {existingImageUrl.length > 0 && (
    <div className="grid grid-cols-3 gap-3">
      {existingImageUrl.map((url, index) => (
        <div key={index} className="relative">
          <img
            src={url}
            alt="existing"
            className="w-full h-32 object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 text-xs"
            onClick={() => handleRemoveExistingImage(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  )}
  {imageUrls.length > 0 && (
  <div className="grid grid-cols-3 gap-3 mt-3">
    {imageUrls.map((url, index) => (
      <div key={`new-${index}`} className="relative">
        <img
          src={url}
          alt="new"
          className="w-full h-32 object-cover rounded-md"
        />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 text-xs"
            onClick={() => handleRemoveNewImage(index)}
          >
            X
          </button>
      </div>
    ))}
  </div>
)}

  <button
    type="button"
    className="p-3 border rounded-lg uppercase hover:shadow-lg disabled:opacity-90 bg-blue-500 text-white"
    onClick={handleImageUpload}
    disabled={imageFiles.length === 0}
  >
    Upload Slike
  </button>
</div>
     
     <button className='mt-7 p-3 bg-blue-600 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>
     {loading ? 'Loading' : 'Update Listing'} 
     </button>

    </form>


    {error ? <p className="mt-5 text-red-700">{error.message}</p> : ''}
    {success ? <p className="mt-5 text-green-700">Listing is successfully updated in DB </p> : ''}
    
    
    
    
    
    </main>
  )
}
