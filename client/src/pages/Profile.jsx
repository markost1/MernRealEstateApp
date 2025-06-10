import  avatarImg  from '../assets/avatarImg.jpg'


export default function Profile() {
  return (
   
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold'>Profile</h1>
      <img src={avatarImg} alt='image' className='rounded-full w-24 h-24 object-cover m-4 mx-auto '/>
      <form className='flex flex-col gap-4'>
        <input type='username' placeholder='Username' className='border rounded-lg p-3'/>
        <input type='email' placeholder='Email'  className='border rounded-lg p-3'/>
        <input type='password' placeholder='Password'  className='border rounded-lg p-3'/>
        <button  className='border rounded-lg p-3 bg-blue-700 text-teal-50 uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between my-4'>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
        <span className='text-red-800 cursor-pointer'>Delete Profile</span>
      </div>
    </div>
    
  )
}
