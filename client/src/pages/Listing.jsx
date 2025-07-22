import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MdCheck } from 'react-icons/md';
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import TrySwiper from "./TrySwiper";
import { FaShare } from "react-icons/fa";


export default function Listing() {

const params = useParams();
const [listingData, setListingData] = useState({});
const [landLord, setLandLord] = useState()
const [message,setMessage] = useState("");
const{currentUser} = useSelector(state => state.user)
const [copy,setCopy] = useState(false)

console.log('trenutni korisnik aplikacije', currentUser);




useEffect(()=>{

    const fetchListing = async() =>{
        const listingId = params.listingId
        
        
        const res = await fetch(`/api/listing/getListing/${listingId}`);
        const data = await res.json()
        if(data.success === false){
            console.log(data.message);
            return;
        }

        setListingData(data)
        
    }

    fetchListing();

     

},[params.listingId])

useEffect(()=>{
const fetchlandLord = async()=>{
  if(!listingData || !listingData.userRef) return;
         
          const res = await fetch(`/api/user/${listingData.userRef}`)
          const data = await res.json()
          if(data.success === false){
            console.log(data.message);
            return;
            
          }
          setLandLord(data)
          
      }

     fetchlandLord();

},[listingData])

console.log('podaci o listingu',listingData);
console.log('podaci o oglasivacu',landLord);


  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
    
      {/* Naslov */}
      <h1 className="text-4xl font-bold">{listingData.name}</h1>

      {/* Slika */}
        <TrySwiper  listingData={listingData}/>
      

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
    {listingData.area && <div><span className="font-semibold">Area:</span> {listingData.area} m²</div>}
    {listingData.landArea && <div><span className="font-semibold">Land Area:</span> {listingData.landArea} m²</div>}
    {listingData.floor > 0 && <div><span className="font-semibold">Floor:</span> {listingData.floor} </div>}
    {listingData.bathrooms > 0 && <div><span className="font-semibold">Bathrooms:</span> {listingData.bathrooms} </div>}
    {listingData.bedrooms > 0 && <div><span className="font-semibold">Bedrooms:</span> {listingData.bedrooms} </div>}
    <div><span className="font-semibold">Location:</span> {listingData.address} </div>
    {listingData.parking && <div className="flex items-center gap-3"><span className="font-semibold">Parking:</span> <MdCheck size={26} color="green"/> </div>}
    {listingData.swimingPool && <div className="flex items-center gap-3"><span className="font-semibold">Swimming Pool:</span> <MdCheck size={26} color="green"/> </div>}
    {listingData.airCondition &&  <div className="flex items-center gap-3"><span className="font-semibold">Air Condition:</span> <MdCheck size={26} color="green" /></div>}
    {listingData.seaView &&  <div className="flex items-center gap-3"><span className="font-semibold">Sea View:</span> <MdCheck size={26} color="green" /></div>}
    {listingData.MonatinView &&  <div className="flex items-center gap-3"><span className="font-semibold">Montain View:</span> <MdCheck size={26} color="green" /></div>}
    {listingData.balcony > 0 &&  <div className="flex items-center gap-3"><span className="font-semibold">Balcony:</span> <MdCheck size={26} color="green" /> </div>}
        </div>
      </section>
      
      {/* kopiranje linka */}
      
      {copy === false ?   <div className="py-3 flex justify-end">
        <FaShare className="w-8 h-8 text-gray-700"
          onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setCopy(true)
            setTimeout(()=>{
              setCopy(false)},
              2000
            )
          }}
        />
      </div> : <div className="py-3 flex justify-end transition ease-in duration-100">
          <p>Link is copied!</p>
        </div>}
    
     

      {/* Kontakt forma */}
      { currentUser && currentUser._id !== listingData.userRef && landLord && 
    (  <section>
        <h2 className="text-2xl font-semibold mb-3">Kontaktirajte nas</h2>
        <form className="space-y-4" 
        onSubmit={(e)=>{
          e.preventDefault();
          window.location.href = `mailto:${landLord.email}?subject=Upit%20za%20oglas&body=${encodeURIComponent(message)}`;
      }}
        >
          <textarea
            placeholder="Vaša poruka..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            onChange={(e)=>{
              setMessage(e.target.value)
            }}
            value={message}
          />

          
          <button
            type="submit"
            className="bg-blue-600 w-full text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Pošalji poruku
          </button>
          
        </form>
      </section>
      )}

   

    </div>
<Footer />
    </div>
  )
}
