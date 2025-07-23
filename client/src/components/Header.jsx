import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import  avatarImg  from '../assets/avatarImg.jpg'

export default function Header() {

const {currentUser} = useSelector(state => state.user)

  return (
    <header className='bg-blue-600 text-white'>
        <div className='flex justify-between p-5 items-center max-w-6xl mx-auto'>
            
            <Link to="/">
            <h1 className='text-sm sm:text-xl flex flex-wrap font-bold'>
                <span className='text-white'>Real</span>
                <span className='text-white'>Estate</span>
            </h1>
            </Link>

            {/* <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                <FaSearch className='text-blue-700'/>
            </form> */}
            <ul className='flex gap-4 items-center'>
            <Link to='/'>
                <li className=' text-white hidden sm:inline hover:underline'>Home</li>
            </Link>
            <Link to="/about">
                <li className=' text-white hidden sm:inline hover:underline'>About</li>
            </Link>
            {currentUser ? <Link to='profile'>
                <img src={currentUser.avatar || avatarImg} alt={currentUser.username} className='w-10 h-10 rounded-full'/>
            </Link> : 
            <Link to='signin'>
                <li className='white sm:inline hover:underline'>SignIn</li>
            </Link>
            }

            
            </ul>
        </div>
    </header>
  )
}
