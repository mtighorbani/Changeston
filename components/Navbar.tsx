import React from "react";
import LogInButton from "./LogInButton";
import ThemeSwitch from "./Theme";
import BurgerMenu from "./BurgerMenu";


const Navbar = () => {
  return (
    <>
    <div className="  flex justify-between max-sm:px-3 max-sm:py-2 max-sm:mt-3  sm:px-28 py-5 max-h-[100px] ">
      <div className="flex max-w-1/3">
        {/* <BurgerMenu />         */}
        <LogInButton />
        <ThemeSwitch />
      </div>
      <div className="flex justify-between pt-2 font-bold max-sm:font-normal ">
        <span className="px-4 max-sm:hidden "><a href="/">درباره فروشگاه</a></span>
        <span className="px-4 max-sm:hidden"><a href="/">تماس با ما</a></span>
        <span className="px-4 max-sm:hidden "><a href="/">قوانین خرید</a></span>
        <p className="px-4">Changeston</p>

      </div>
    </div>
   {/* <div className="w-5/6 h-1 bg-gray-500 m-auto"/> */}
   </>
  );
};

export default Navbar;
