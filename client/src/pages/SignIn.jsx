import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

const handleChange = (e) =>{
  return setFormData({
    ...formData,
    [e.target.id] : e.target.value,
  }
  )
}
console.log(formData);

const handleSubmit =async (e) =>{
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })

    const data = await res.json()
    console.log(data);
    if(data.success === false){
      setLoading(false)
      setError(data.message)
      return;
    }
    
    setLoading(false)
    setError(null)
    navigate('/')

  } catch (error) {
    console.log(error);
    setLoading(false)
    setError(error.message)
    
  }
}


  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='m-7 text-center text-3xl font-bold'>Sign In Page</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email' className='p-3 border rounded-lg ' id="email" onChange={handleChange}/>
        <input type='password' placeholder='Password' className='p-3 border rounded-lg' id="password" onChange={handleChange}/>
        <button disabled={loading} className='p-3 bg-blue-700 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-85'>
        {loading ? 'Loading' : 'Sign In'}
        </button>
      </form>
      <div className='my-5 flex gap-3'>
           <p>You are not registered? </p>
           <Link to='/signup'>
           <span className='text-blue-700'>Sign Up</span>
          </Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
   
    </div>
  )
}
