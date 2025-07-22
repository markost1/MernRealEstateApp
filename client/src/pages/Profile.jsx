import { useState } from 'react'
import  avatarImg  from '../assets/avatarImg.jpg'
import {useDispatch, useSelector} from 'react-redux'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'


export default function Profile() {
const {currentUser, loading, error} = useSelector(state => state.user)
const [formData,setFormData] = useState({})
const [updateSuccess, setUpdateSuccess] = useState(false)
const [userListings, setUserListings] = useState([])
const dispatch = useDispatch();
const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id] : e.target.value,
    })
  }

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
     dispatch(updateUserStart()) 
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json();

      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return;
        
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
      


      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
      
    }
  }

  const handleDeleteUser = async() =>{
  
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      })

      const data = await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
      }
      console.log(data);

      dispatch(deleteUserSuccess(data))
      navigate('/signup')
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
      
    }
  }

  const handleSignOut = async() => {
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout');
      const data =await res.json()
      if(data.success === false){
        dispatch(signOutFailure(data.message))
        return;
      }

      dispatch(signOutSuccess(data))
      navigate('/signin')
      
      

    } catch (error) {
        dispatch(signOutFailure(error.message))
      
    }
  }

  const showUserListings = async() =>{
    try {
      const res = await fetch(`api/user/listings/${currentUser._id}`)
      const data = await res.json()

      if(data.success === false){
        console.log(data.message);
        return;
      }

      setUserListings(data)


    } catch (error) {
      console.log(error.message);
      
    }
  }

  const handleDeleteListing = async (listingId) =>{
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method:'DELETE'
      })
      const data = await res.json()
      if (data.success !== false) {
        console.log(data.message);
        return;
        
      }
      //filtracija userListinga uklanjam listing sa ovim id-jem iz baze
      setUserListings((prev)=> prev.filter((listing)=> listing._id !== listingId))

    } catch (error) {
      console.log(error);
      
    }
  }
  

  return (
   
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold'>Profile</h1>
      <img src={avatarImg} alt='image' className='rounded-full w-24 h-24 object-cover m-4 mx-auto '/>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='username' id='username' placeholder='Username' className='border rounded-lg p-3' defaultValue={currentUser.username} onChange={handleChange} />
        <input type='email' id='email 'placeholder='Email'  className='border rounded-lg p-3' defaultValue={currentUser.email} onChange={handleChange} />
        <input type='password' id='password' placeholder='Password'  className='border rounded-lg p-3'/>
        <button  className='border rounded-lg p-3 bg-blue-700 text-teal-50 uppercase hover:opacity-90 disabled:opacity-80'>
        {loading ? 'Loading' : 'Update'}
        </button>
        
        <Link className='border rounded-lg p-3 text-center bg-blue-950 text-teal-50 uppercase hover:opacity-90 disabled:opacity-80' to='/create-listing'>
        Create Listing
        </Link>
        
        
      </form>
      
      <div className='flex justify-between my-4'>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
        <span onClick={handleDeleteUser} className='text-red-800 cursor-pointer'>Delete Profile</span>
      </div>
      {error && <p className='text-red-800 mt-5'>{error}</p>}
      {updateSuccess && <p className='text-green-600 mt-5'>User is successfully updated</p>}

      <button onClick={showUserListings} className='text-green-700 w-full'>Show listings</button>
      <div className='flex flex-col gap-3 mt-3'>
      {userListings && userListings.length > 0 && userListings.map((listing)=>{
        return <div className='border flex p-3 justify-between items-center gap-3  flex-1 min-w-0' key={listing._id}>
        <Link to={`/listing/${listing._id}`} >
          <img className='w-12 h-12 shrink-0' src={listing.imageUrls[0]} alt='image'/>
          </Link>
          <Link to={`/listing/${listing._id}` } className='flex-1 min-w-0'>
          <p className='flex-1 truncate hover:underline '>{listing.name}</p>
          </Link>
          <div className='flex flex-col gap-2 shrink-0'>
          {/* stavio bih link koji vodi na stranicu koja kad se ocita ima postake iz liatinga sa ogovarajucim id jem edit-listing/listing.id */}
           <Link to={`/edit-listing/${listing._id}`}>
            <button className='text-green-700 uppercase'>Edit</button>
           </Link>
            <button onClick={()=>handleDeleteListing(listing._id)} className='text-red-700 uppercase'>Delete</button>
          </div>
        </div>
        
      })}
      
      </div>
    </div>
    
  )
}
