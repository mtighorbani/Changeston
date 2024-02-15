import React from "react";
import LogInButton from "./LogInButton";
import ThemeSwitch from "./Theme";
import './cssStyle/font.css'
const Navbar = () => {
  return (
    <>
    <div className="  flex justify-between  px-32 py-5 max-h-[100px] ">
      <div className="flex w-1/3">
        <LogInButton />
        <ThemeSwitch />
      </div>
      <div className="flex justify-between pt-2 font-bold font">
        <span className="px-4  "><a href="/">درباره فروشگاه</a></span>
        <span className="px-4 "><a href="/">تماس با ما</a></span>
        <span className="px-4 "><a href="/">قوانین خرید</a></span>
        <p className="px-4">Changeston</p>

      </div>
    </div>
   {/* <div className="w-5/6 h-1 bg-gray-500 m-auto"/> */}
   </>
  );
};

export default Navbar;
