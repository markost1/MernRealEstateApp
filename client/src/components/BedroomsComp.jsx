import { useEffect, useRef, useState } from "react";

const bedroomsOpt = [
{label:'Studio', value:0},
{label:'1', value:1},
{label:'2',value:2},
{label:'3',value:3},
{label:'4', value:4},
{label:'5+', value:5}
]




export default function BedroomsComp({formData,setFormData}) {

    const[showDropdown, setShowDropdown] = useState(false)
        const dropdownrRef = useRef(null);
    
    const bedroomsArr = Array.isArray(formData.bedrooms) ? formData.bedrooms : [];
    
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
    
        
            
        const handleBedroomsChange = (beds) => {
                setFormData((prev)=>{
                    const alreadySelected = bedroomsArr.includes(beds);
                     return {
                        ...prev,
                      bedrooms: alreadySelected
      ? prev.bedrooms.filter((bed) => bed !== beds)
      : [...bedroomsArr, beds],
                     };
                });
            };
       
    const selectedLabels = bedroomsOpt
  .filter(opt => bedroomsArr.includes(opt.value))
  .map(opt => opt.label)
  .join(', ');

  return (
        <div ref={dropdownrRef} className="relative inline-block text-left w-full max-w-md">
            <button onClick={toogleDropdown}
            type="button" 
            className=" w-full border p-3 rounded-md shadow bg-white text-left cursor-default truncate">
                {formData.bedrooms.length === 0 ?
                "Sve" :
                selectedLabels }
            </button>
                    {showDropdown &&  <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-scroll">
                    {bedroomsOpt.map(({label,value})=>(
                        <div key={value} className="border-b px-4 py-2">
                            <label className="font-medium cursor-pointer flex items-center gap-2">
                                <input type="checkbox"
                                checked={formData.bedrooms.includes(value)}
                                onChange={()=>{handleBedroomsChange(value)}}
                                />
                                {label}
                            </label>
                        
                            
                        </div>
                    )
    
                    )}
            </div> }
           
        </div>
  )
}
