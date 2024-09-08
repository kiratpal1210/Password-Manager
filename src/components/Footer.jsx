import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-slate-900 text-white py-6'>
      <div className='flex flex-col justify-center items-center space-y-3'>
        <img 
          src="/icons/BHOOLJAO.png" 
          alt="BhoolJAO Logo" 
          className='w-32 h-auto' // Adjust width and height as needed
        />
        <div className='logo font-bold text-white text-3xl tracking-wide flex items-center'>
          <span className='text-green-500 text-4xl'>&lt;</span>
          <span className='mx-1'>Bhool</span>
          <span className='text-green-500 text-4xl'>JAO/&gt;</span>
        </div>

        <div className='flex items-center space-x-2'>
          <span>Created with</span>
          <FaHeart className='text-red-600 animate-pulse' />
          <span>by</span>
          <a 
            href="https://www.linkedin.com/in/kiratpal-singh-kalsey-a92b15230/" 
            target='_blank' 
            rel="noopener noreferrer" 
            className='text-green-500 font-semibold hover:underline transition duration-300'>
            Kiratpal Singh Kalsey
          </a>
        </div>

        <div className='text-sm opacity-75'>
          &copy; 2024 BhoolJAO. All rights reserved.
        </div>
      </div>
    </div>
  );  
};

export default Footer;
