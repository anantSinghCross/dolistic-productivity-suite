import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = () => {
    if(areValid(email, password)){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCreds) => console.log(userCreds))
      .catch((err) => console.log(err))
    }
  }

  const areValid =(email, password) => {
    return true;
  }
  
  return (
    <div className='flex w-full justify-center'>
      <div className="m-4 flex w-screen max-w-md flex-col gap-2 rounded-xl border p-4 shadow-md">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input className="rounded-md border p-2 shadow-inner" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Password</label>
          <input className="rounded-md border p-2 shadow-inner" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="flex justify-between mt-2">
          <button className="p-2 px-4 hover:underline text-indigo-500" onClick={() => navigate('/login')}>Login</button>
          <button className="primary-btn" onClick={handleSubmit}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Signup;