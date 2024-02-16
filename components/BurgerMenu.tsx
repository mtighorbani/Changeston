'use client'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import itemMenu from "@/Array/itemMenu";
  
export default function BurgerMenu() {
  const [isVisible, setVisible] = useState(true)

  const visibleHandler = () => {
    { setVisible(false)}
  }
  const closeVisibleHandler = () => {
    { setVisible(true)}
  }

  return (
    <div className="sm:hidden " >
    {isVisible? <GiHamburgerMenu onClick={visibleHandler} className="cursor-pointer size-8 mr-2 mt-1"/>:null}
    {!isVisible ?< MdOutlineClose onClick={closeVisibleHandler}  className="cursor-pointer size-8 mr-2 mt-1"/>:null}
   {!isVisible ? <div  className=" max-w-20">
      <ul className="absolute ml-0 mt-4 bg-gray-300 m-2 px-4 ring-1 ring-black rounded-tr-lg rounded-br-lg rounded-bl-lg ">
        {itemMenu.map((item)=>
        <>
        <li className=" p-2 text-center  " key={item.id}><a href={item.href}>{item.name}</a></li>
        <div className="h-[1px] w-full bg-black"></div>
        </>
        )}
      </ul> 
    </div>:null}
    </div>

  )
}
