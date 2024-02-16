import React from "react";
import { IoIosLogIn } from "react-icons/io";


const LogInButton = () => {
  return (
    <div>
      <button className="max-sm:hidden  transition duration-300  sm:font-size-[6px] ease-in-out flex hover:outline bg-[#5a8dee] text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold max-sm:py-2 max-sm:px-3 py-2 px-4 rounded-md font-[BMitra] font-bold ">
        <span >ورود / ثبت نام</span>
        <IoIosLogIn className="max-sm:hidden size-6  "/>
      </button>
    </div>
  );
};

export default LogInButton;
