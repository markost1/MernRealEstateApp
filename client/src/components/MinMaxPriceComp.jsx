import React from 'react'

export default function MinMaxPriceComp({formData, setFormData}) {

const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.id]:e.target.value
    })
}

  return (
    <div className='flex justify-between items-center max-w-md w-full ' >
        <div>
            
            <input type='Number' placeholder='From (€)' className='border rounded-lg shadow p-3' id='minPrice' onChange={handleChange} />
        </div>
        <div>
            -
        </div>
        <div>
            <input type='Number' placeholder='To (€)' className='border rounded-lg shadow p-3 ' id='maxPrice' onChange={handleChange} />
        </div>
       
    </div>
  )
}
