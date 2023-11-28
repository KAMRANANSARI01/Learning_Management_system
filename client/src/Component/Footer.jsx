import React from 'react'
import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin} from 'react-icons/bs'

const Footer = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear()

  return (
    <footer className='relative left-0 bottom-0 sm:h-[10vh]  sm:py-5 flex flex-col  sm:flex-row items-center justify-between   bg-gray-800 text-white sm:px-20 py-2 gap-2'>
        <section className='sm:text-lg text-xs'>
            Copyright {year} | All rights reserved.
        </section>
        <section className='flex items-center justify-center sm:text-2xl text-white gap-5'>
            <a href=" #" className='hover:text-yellow-400 transition-all ease-in-out duration-300'><BsFacebook/></a>
            <a href="# " className='hover:text-yellow-400 transition-all ease-in-out duration-300'><BsInstagram/></a>
            <a href="# " className='hover:text-yellow-400 transition-all ease-in-out duration-300'><BsTwitter/></a>
            <a href="# " className='hover:text-yellow-400 transition-all ease-in-out duration-300'><BsLinkedin/></a>
             
             
             
        </section>
    </footer>
  )
}

export default Footer;
