import { Link } from "react-router-dom"

export default function SignIn() {
  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='m-7 text-center text-3xl font-bold'>Sign In Page</h1>
      <form className='flex flex-col gap-4'>
        <input type='email' placeholder='Email' className='p-3 border rounded-lg '/>
        <input type='password' placeholder='Password' className='p-3 border rounded-lg'/>
        <button className='p-3 bg-blue-700 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-85'>Sign In</button>
      </form>
      <div className='my-5 flex gap-3'>
           <p>You are not registered? </p>
           <Link to='/signup'>
           <span className='text-blue-700'>Sign Up</span>
          </Link>
      </div>
   
    </div>
  )
}
