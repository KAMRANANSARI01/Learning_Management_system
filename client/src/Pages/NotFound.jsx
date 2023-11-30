import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center w-full h-screen flex-col bg-[1A2238] '>
      <h1 className='text-9xl font-extrabold text-white tracking-widest'>
        404
      </h1>
      <div className="bg-black absolute text-white px-2 rounded rotate-12 ">
        Page Not Found....
      </div>
      <button>
        <a className='relative inline-block text-sm font-medium text-[#FF6A3D] mt-4 group active:text-yellow-500 focus:outline-none focus:ring ' >
            <span onClick={()=>navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current ">
                Go Back
            </span>
        </a>
      </button>
    </div>
  )
}

export default NotFound
