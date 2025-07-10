

import { useEffect, useRef, useState } from "react"




export default function TypeComp({formData, setFormData}) {

    const[showDropdown, setShowDropdown] = useState(false)
    const dropdownrRef = useRef(null);


    useEffect(()=>{
        const handleClickOutside = (event) =>{
            if (dropdownrRef.current && !dropdownrRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        };

        document.addEventListener('mousedown',handleClickOutside)
        return () =>{
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[])

   
    const toogleDropdown = () =>{
        setShowDropdown(prev => !prev)
    }


        
    const handleChange = (e) => {
           if(e.target.id === 'all' || e.target.id === 'sale' || e.target.id === 'rent'){
            
            setFormData({
                ...formData,
                type: e.target.id,
            })
           }
        
        }


  return (
    <div ref={dropdownrRef} className="relative inline-block text-left w-full max-w-md">
        <button onClick={toogleDropdown}
        type="button" 
        className=" w-full border p-3 rounded-md shadow bg-white text-left cursor-default truncate">
            {formData.type === 'all' ? 'Svi tipovi' : formData.type }
        </button>
                {showDropdown &&  
         <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-scroll">
             
            <div>
            <input type="checkbox"  id="all" checked={formData.type =='all'} onChange={handleChange}/>
            <label>Svi Tipovi</label>
            </div>

            <div>
            <input type="checkbox"  id="sale" checked={formData.type === 'sale'} onChange={handleChange}/>
            <label>Sale</label>
            </div>

            <div>
            <input type="checkbox"  id="rent" checked={formData.type === 'rent'} onChange={handleChange}/>
            <label>Rent</label>
            </div>


        
         {/* zatvranje diva */}



         </div> }
       
    </div>
  )
}
