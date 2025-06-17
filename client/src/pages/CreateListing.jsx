import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-3xl mx-auto'>
   
    <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
    <form className='flex flex-col'>
    {/* kontainer za unos podataka */}
      <div className='flex flex-col gap-4 flex-1'>
      
        <input type='text' placeholder='Name' id='name ' className='border p-3 rounded-lg' maxLength='62' minLength='10' required/>
        <textarea type='text' placeholder='Description' id='description' className='border p-3 rounded-lg' required />
        <input type='text' placeholder='Address' id='address' className='border p-3 rounded-lg' required />
     {/* kontainer sa check box-om */}
     <div className='flex justify-between flex-wrap'>
        <div className='flex gap-2'>
          <input type='checkbox' id='sale' className='w-5'/>
          <span>Sell</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='rent' className='w-5'/>
          <span>Rent</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='parking' className='w-5'/>
          <span>Parking Spot</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='furnished' className='w-5'/>
          <span>Furnished</span>
        </div>
     </div>
     {/* kontainer za unos soba i kupatila i cijene  */}
     <div className='flex flex-wrap gap-3 sm:flex-row justify-between'>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10' required id='beds' className='p-3 border border-gray-400 rounded-lg'/>
          <span>Beds</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='10' required id='bathrooms' className='p-3 border border-gray-400 rounded-lg'/>
          <span>Bathrooms</span>
        </div>
        <div className='flex items-center gap-3'>
          <input type='number' min='1' max='100000000' required  id='regularPrice' className='p-3 border border-gray-400 rounded-lg'/>
          <div className='flex flex-col items-center'>
          <span>Regular Price</span> 
          <span> $ </span> 
          </div>
          
        </div>
        
     </div>
     
      </div>
     
     <button className='mt-7 p-3 bg-blue-600 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>
      Create Listing
     </button>

    </form>
    
    
    
    
    
    </main>
  )
}
