import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import  avatarImg  from '../assets/avatarImg.jpg'

export default function Header() {

const {currentUser} = useSelector(state => state.user)

  return (
    <header className='bg-blue-300'>
        <div className='flex justify-between p-3 items-center max-w-6xl mx-auto'>
            
            <Link to="/">
            <h1 className='text-sm sm:text-xl flex flex-wrap font-bold'>
                <span className='text-blue-700'>Real</span>
                <span className='text-blue-600'>Estate</span>
            </h1>
            </Link>

            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                <FaSearch className='text-blue-700'/>
            </form>
            <ul className='flex gap-4 items-center'>
            <Link to='/'>
                <li className=' text-blue-800 hidden sm:inline hover:underline'>Home</li>
            </Link>
            <Link to="/about">
                <li className=' text-blue-800 hidden sm:inline hover:underline'>About</li>
            </Link>
            {currentUser ? <Link to='profile'>
                <img src={avatarImg} alt={currentUser.username} className='w-10 h-10'/>
            </Link> : 
            <Link to='signin'>
                <li className='text-blue-800 sm:inline hover:underline'>SignIn</li>
            </Link>
            }

            
            </ul>
        </div>
    </header>
  )
}
