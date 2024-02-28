import ContactUs from '@/components/ContactUs'
import ContactUsDetails from '@/components/ContactUsDetails';
import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";


const page = () => {
  return (
    <div className='mb-48'>
    <h1 dir='rtl' className=' mx-auto justify-center flex text-2xl mb-24 mt-4'>تماس با ما<FaPhoneAlt className='mr-2 mt-1'/></h1>
    <div className=' grid-cols-2 grid mx-auto w-[80%]' dir='rtl'>
    <div className='ml-24'>
      {<ContactUs/>}
      </div>
      <div className='mr-4'>
        <ContactUsDetails/>
      </div>
      </div>
      </div >
  )
}

export default page