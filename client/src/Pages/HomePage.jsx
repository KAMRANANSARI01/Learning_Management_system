import React from 'react'
import  HomeLayout from '../Layouts/HomeLayout.jsx'
import { Link } from 'react-router-dom'
import homeImg from    '../assets/homePageMainImage.png'

const HomePage = () => {
  return (
    <>
    <HomeLayout>
        <div className="flex flex-col bg-red-600   sm:flex-row items-center sm:justify-between pt-10 h-[90vh] lg:mx-20 ">
           <div className="sm:w-1/2  bg-slate-300  sm:px-20 gap-5  flex flex-col justify-center items-center sm:gap-3  h-[60%]">
                <h1 className="lg:text-5xl  text-2xl font-semibold  text-white">
                    Find Out Best
                    <span className='text-yellow-500 font-bold'> Online Courses</span>
                </h1>
                <p className="text-lg sm:text-2xl text-white text-center ">
                    We have a large library of courses 
                    thaught by highly skilled and qualified faculties at very affordable cost.
                </p>
                <div className="space-x-6">
                    <Link to="/course">
                         <button className='sm:py-3 py-1 sm:px-5 px-2 text-white bg-yellow-500 rounded-md cursor-pointer font-semibold text-lg hover:bg-yellow-600 transition-all ease-in-out duration-200'>
                            Explore Coureses
                         </button>
                      
                    </Link>
                    <Link to="/contact">
                         <button className=' border border-yellow-500  sm:py-3  py-1 px-5 text-white  cursor-pointer rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all ease-in-out duration-200'>
                            Contact Us
                         </button>
                      
                    </Link>
                </div>
           </div>
           <div className='sm:w-1/2  h-[50%] bg-yellow-800 flex items-center justify-center'>
                <img className=' h-[80%]'  src= {homeImg}  alt="img" />
           </div>
        </div>
    </HomeLayout>
    </>
  )
}

export default HomePage
