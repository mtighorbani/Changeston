import ContactUs from '@/components/ContactUs';
import ContactUsDetails from '@/components/ContactUsDetails';
import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";

const page = () => {
  return (
    <div className='h-auto bg-gray-200 dark:bg-slate-800 py-10'>
      <h1 dir='rtl' className='mx-auto justify-center flex text-3xl font-bold mb-7 pt-12'>
        تماس با ما<FaPhoneAlt className='mr-2 mt-1'/>
      </h1>
      <hr className='bg-slate-800 h-[1.5px] w-[80%] mx-auto mb-7' />
      <div className='grid grid-cols-1 sm:grid-cols-2 mx-auto w-full sm:w-[80%] px-4 sm:px-0'>
        <div className='sm:ml-24 mb-16 sm:mb-0'>
          <ContactUs />
        </div>
        <div className='sm:mr-4'>
          <ContactUsDetails />
        </div>
      </div>
    </div>
  );
};

export default page;
