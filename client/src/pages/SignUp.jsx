import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
const [formData,setFormData] = useState({});

const handleChange = (e) =>{
  setFormData({
    ...formData,
    [e.target.id] : e.target.value
  })
}

const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    })
    const data = await res.json();
    console.log(data);
  
    
    
  } catch (error) {
    console.log(error);
    
  }
}



  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='my-7 text-center text-3xl  font-semibold '>Sign Up Page</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' id="username" className=' p-3 border rounded-lg' onChange={handleChange}/>
        <input type='email' placeholder='Email' id="email" className=' p-3 border rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='Password' id="password" className=' p-3 border rounded-lg' onChange={handleChange}/>
        <button className='p-3 bg-blue-700 text-white  border rounded-lg uppercase hover:opacity-90 disabled:opacity-85'>Sign up</button>
      </form>
      <div className='flex gap-2 my-5'>
        <p>Have an account?</p>
        <Link to='/signin'>
        <span className="text-blue-800">
          Sign in
        </span>
        </Link>
      </div>
    </div>
  )
}
