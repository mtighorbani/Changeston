import React from "react";
import LogInButton from "./LogInButton";
import ThemeSwitch from "./Theme";


const Navbar = () => {
  return (
    <div className=" flex justify-between px-20 py-5 max-h-[100px]">
      
      <div className="flex w-1/3">
        <LogInButton/>
        <ThemeSwitch />
      </div>
      <div className="flex-end" ></div>
    </div>
  );
};

export default Navbar;
