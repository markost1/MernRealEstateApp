import { useEffect, useRef, useState } from "react"
import { allLocation } from "../data/data.js";


export default function LocationComp({formData, setFormData}) {

    const[showDropdown, setShowDropdown] = useState(false)
    const dropdownrRef = useRef(null);

    const locationArr = Array.isArray(formData.location) ? formData.location : [];

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

    const handleCityClick = (city) => {
        const places = allLocation[city]
        console.log(places); // vraca sva mjesta

        const allSelected = places.every((p) => locationArr.includes(p))
        
        setFormData((prev)=>({
            ...prev, 
            location: allSelected
  ? prev.location.filter((loc) => !places.includes(loc))
  : [...new Set([...locationArr, ...places])],
        }))
    }
        
    const handleLocationChange = (place) => {
            setFormData((prev)=>{
                const alreadySelected = locationArr.includes(place);
                 return {
                    ...prev,
                  location: alreadySelected
  ? prev.location.filter((loc) => loc !== place)
  : [...locationArr, place],
                 };
            });
        };
   


  return (
    <div ref={dropdownrRef} className="relative inline-block text-left w-full max-w-md">
        <button onClick={toogleDropdown}
        type="button" 
        className=" w-full border p-3 rounded-md shadow bg-white text-left cursor-default truncate">
            {!formData.location || formData.location.length === 0 ?
            "Odaberi Lokaciju" :
            formData.location.join(',')}
        </button>
                {showDropdown &&  <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-scroll">
                {Object.entries(allLocation).map(([city,places])=>(
                    <div key={city} className="border-b px-4 py-2">
                        <label className="font-medium cursor-pointer flex items-center gap-2">
                            <input type="checkbox"
                            checked={places.every((p)=> formData.location.includes(p))}
                            onChange={()=>{handleCityClick(city)}}
                            />
                            {city}
                        </label>
                    <div className="pl-6 pt-2">
                        {places.map((place)=>(
                            <label key={place} 
                            className="block cursor-pointer mb-1">
                                <input 
                                    type="checkbox"
                                    className="mr-2"
                                    checked={formData.location.includes(place)}
                                    onChange={()=>
                                        handleLocationChange(place)}
                                />
                                {place}
                            </label>
                        ))} 
                    </div>
                        
                    </div>
                )

                )}
        </div> }
       
    </div>
  )
}
