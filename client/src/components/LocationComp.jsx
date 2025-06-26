

export default function LocationComp({formData, setFormData}) {

    const allLocation = {
        Budva:['Becici','Rafailovici','Rozino','Babin Do','Sveti Stefan'],
        Bar:['Sutomore','Susanj']
    }


  return (
    <div className="relative inline-block text-left w-full max-w-md">
        <button type="button" 
        className=" w-full border p-3 rounded-md shadow bg-white text-left cursor-default">
            {formData.location.length === 0 ?
            "Odaberi Lokaciju" :
            formData.location.join(',')}
        </button>

        <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg mah-h-64 overflow-y-scroll">
                {Object.entries(allLocation).map(([city,places])=>(
                    <div key={city} className="border-b px-4 py-2">
                        <label className="font-medium cursor-pointer flex items-center gap-2">
                            <input type="checkbox"/>
                            {city}
                        </label>
                    <div className="pl-6 pt-2">
                        {places.map((place)=>(
                            <label key={place} 
                            className="block cursor-pointer mb-1">
                                <input 
                                    type="checkbox"
                                    className="mr-2"
                                />
                                {place}
                            </label>
                        ))} 
                    </div>
                        
                    </div>
                )

                )}
        </div>
    </div>
  )
}
