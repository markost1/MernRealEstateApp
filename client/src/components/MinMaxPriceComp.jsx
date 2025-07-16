import React from 'react'

export default function MinMaxPriceComp({formData, setFormData}) {

const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.id]:e.target.value
    })
}

  return (
<div className='flex items-center gap-2 w-full max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg ' >
        
            
            <input type='number' placeholder='From (€)' 
            className='w-1/2 border rounded-lg shadow p-3' id='minPrice' onChange={handleChange} />
        
        <span className='px-1 text-gray-600'>
            -
        </span>
        
            <input type='number' placeholder='To (€)' 
            className='w-1/2 border rounded-lg shadow p-3 ' id='maxPrice' onChange={handleChange} />
    
       
    </div>
  )
}
