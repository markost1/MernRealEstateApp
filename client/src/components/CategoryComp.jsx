import { useEffect, useRef, useState } from "react"
import {category} from "../data/data.js";



export default function CategoryComp({formData, setFormData}) {

    const[showDropdown, setShowDropdown] = useState(false)
    const dropdownrRef = useRef(null);

    const categoryArr = Array.isArray(formData.category) ? formData.category : [];

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

    
        
    const handleCategoryChange = (categ) => {
            setFormData((prev)=>{
                const alreadySelected = categoryArr.includes(categ);
                 return {
                    ...prev,
                  category: alreadySelected
  ? prev.category.filter((cat) => cat !== categ)
  : [...categoryArr, categ],
                 };
            });
        };
   


  return (
    <div ref={dropdownrRef} className="relative inline-block text-left w-full max-w-md">
        <button onClick={toogleDropdown}
        type="button" 
        className=" w-full border p-3 rounded-md shadow bg-white text-left cursor-default truncate">
            {!formData.category || formData.category.length === 0 ?
            "Sve Kategorije" :
            categoryArr.join(',')}
        </button>
                {showDropdown &&  <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-scroll">
                {category.map((categ)=>(
                    <div key={categ} className="border-b px-4 py-2">
                        <label className="font-medium cursor-pointer flex items-center gap-2">
                            <input type="checkbox"
                            checked={formData.category.includes(categ)}
                            onChange={()=>{handleCategoryChange(categ)}}
                            />
                            {categ}
                        </label>
                    
                        
                    </div>
                )

                )}
        </div> }
       
    </div>
  )
}
