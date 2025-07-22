import { FaFacebook, FaInstagram, FaTiktok, FaPhone,FaMailBulk } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className='bg-blue-600 text-white mt-10'>
        <div className='max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 gap-8 md:grid-cols-3' >
            

                  <div>
                    <h2 className="text-xl font-bold mb-2">RealEstate</h2>
                    <p className="text-sm text-gray-200">Agencija za trgovinu nekretninama</p>
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
                    <p className="text-sm text-gray-300 flex items-center gap-5 my-2"><FaMailBulk /> <span>realestate@gmail.com</span></p>
                    <p className="text-sm text-gray-300 flex items-center  gap-5 my-2"><FaPhone/> <span>069 123 456</span></p>
                    <div className='flex gap-4 mt-3'>
                      <a href='http://www.facebook.com ' target="_blank" ><FaFacebook /></a> 
                        <a href="http://www.instagram.com" target="_blank"><FaInstagram /></a>
                        <a href="http://www.tiktok.com" target="_blank"><FaTiktok /></a>
                    </div>
                  </div>

            
        </div>
        <div className="flex flex-col justify-center items-center text-xs font-semibold p-1 md:flex-row gap-3">
          <p>© Copyright {new Date().getFullYear()} Nekretnine RealEstate. </p> <span className="text-gray-300">Made with ❤️ by Prentindo tehnology</span>
        </div>
    </footer>
  )
}
