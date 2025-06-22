import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MdCheck } from 'react-icons/md';
import home from '../assets/home.jpg'


export default function Listing() {

const params = useParams();
const [listingData, setListingData] = useState({});

useEffect(()=>{

    const fetchListing = async() =>{
        const listingId = params.listingId
        console.log(listingId);
        
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json()
        if(data.success === false){
            console.log(data.message);
            return;
        }

        setListingData(data)
        
        
    }


    fetchListing();

},[params.listingId])

console.log(listingData);

  return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Naslov */}
      <h1 className="text-4xl font-bold">{listingData.name}</h1>

      {/* Slika */}
      <div className="overflow-hidden rounded-xl shadow-lg">
        <img
          src={home}
          alt="Nekretnina"
          className="w-full object-cover"
        />
      </div>

      {/* Opis */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Opis</h2>
        <p className="text-gray-700 leading-relaxed">
          {listingData.description}
        </p>
      </section>

      {/* Detalji */}
      <section>
        <h2 className="text-2xl font-semibold mb-4"></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-800 text-sm">
    <div><span className="font-semibold">Price:</span> {listingData.regularPrice} € </div>
    <div><span className="font-semibold">Area:</span> {listingData.area} m²</div>
    {listingData.landArea && <div><span className="font-semibold">Land Area:</span> {listingData.landArea} m²</div>}
    {listingData.floor && <div><span className="font-semibold">Floor:</span> {listingData.floor} </div>}
    <div><span className="font-semibold">Location:</span> {listingData.address} </div>
    {listingData.parking && <div className="flex items-center gap-3"><span className="font-semibold">Parking:</span> <MdCheck size={26} color="green"/> </div>}
    {listingData.swimingPool && <div className="flex items-center gap-3"><span className="font-semibold">Swimming Pool:</span> <MdCheck size={26} color="green"/> </div>}
    {listingData.airCondition &&  <div className="flex items-center gap-3"><span className="font-semibold">Air Condition:</span> <MdCheck size={26} color="green" /></div>}
    {listingData.seaView &&  <div className="flex items-center gap-3"><span className="font-semibold">Sea View:</span> <MdCheck size={26} color="green" /></div>}
    {listingData.MonatinView &&  <div className="flex items-center gap-3"><span className="font-semibold">Montain View:</span> <MdCheck size={26} color="green" /></div>}
    {listingData.balcony &&  <div className="flex items-center gap-3"><span className="font-semibold">Balcony:</span> <MdCheck size={26} color="green" /> </div>}
        </div>
      </section>

      {/* Kontakt forma */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Kontaktirajte nas</h2>
        <form className="space-y-4">
          <textarea
            placeholder="Vaša poruka..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
          <button
            type="submit"
            className="bg-blue-600 w-full text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Pošalji poruku
          </button>
        </form>
      </section>
    </div>
  )
}
