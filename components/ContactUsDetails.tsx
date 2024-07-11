import React from 'react';
import { FaTelegram } from "react-icons/fa6";

const ContactUsDetails = () => {
  return (
    <div dir='rtl' className='text-md rounded p-4 sm:p-10 font-medium'>
      <div className='text-center text-2xl sm:text-3xl font-serif font-extrabold mb-4 sm:mb-8'>
        <p>اطلاعات تماس</p>
      </div>
      <div className='mb-4 sm:mb-6'>
        <p>جهت ارتباط با پشتیبانی به ID ذیل مراجعه نمایید</p>
        <a href="https://t.me/changeston_admin" dir='ltr' className='flex items-center'>
          <FaTelegram className='mt-1 mr-2' /> @Changeston
        </a>
      </div>
      <div className='block'>
        <h1 className='mb-2 text-xl sm:text-2xl font-serif font-bold'>ساعت پاسخگویی:</h1>
        <p>روز های کاری  9 الی 23</p>
        <p>روزهای تعطیل کلیه پیام ها حداکثر تا ساعت 23 پاسخ داده می شوند</p>
      </div>
    </div>
  );
};

export default ContactUsDetails;
