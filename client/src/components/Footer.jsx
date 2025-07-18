import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className='bg-blue-600 text-white mt-10'>
        <div className='max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 gap-8 md:grid-cols-3' >
            

                  <div>
                    <h2 className="text-xl font-bold mb-2">RealEstate</h2>
                    <p className="text-sm text-gray-400">Agencija za trgovinu nekretninama</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                        Linkovi
                    </h3>
                    <div className="flex flex-col space-y-1 text-gray-300 text-sm">
                        <Link to='/about'> O nama</Link>
                        <Link to='/'>Nekretnine</Link>
                        <Link to='/contact'>Kontakt</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Kontakt</h3>
                    <p className="text-sm text-gray-300">Email: realestate@gmail.com</p>
                    <div className='flex gap-4 mt-3'>
                      <a href='http://www.facebook.com ' target="_blank" ><FaFacebook /></a> 
                        <a href="http://www.instagram.com" target="_blank"><FaInstagram /></a>
                        <a href="http://www.tiktok.com" target="_blank"><FaTiktok /></a>
                    </div>
                  </div>

            
        </div>
    </footer>
  )
}
