import React from "react";
import { IoIosLogIn } from "react-icons/io";
import "./cssStyle/Button.css";


const LogInButton = () => {
  return (
    <div>
      <button className="flex hover:outline hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold py-2 px-4 rounded-md font-[BMitra] font-bold ">
        <span>ورود / ثبت نام</span>
        <IoIosLogIn className="size-6 ml-2"/>
      </button>
    </div>
  );
};

export default LogInButton;
