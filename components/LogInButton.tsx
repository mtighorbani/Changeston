'use client'
import { useRouter } from 'next/navigation'
import React from "react";
import { IoIosLogIn } from "react-icons/io";




const LogInButton = () => {
  const router = useRouter()

  const OpenLoginHandler = ()=>{
    router.push('/login')
  }
  return (
    <div>
      <button onClick={OpenLoginHandler} className="max-sm:hidden  transition duration-300  sm:font-size-[6px] ease-in-out flex hover:outline bg-[#2089DA]   text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold max-sm:py-2 max-sm:px-3 py-2 px-4 rounded-md font-[BMitra] font-bold ">
        <span >ورود / ثبت نام</span>
        <IoIosLogIn className="max-sm:hidden size-6  ml-2"/>
      </button>
    </div>
  );
};

export default LogInButton;
