'use client'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";


const itemMenu = [
  {id:1, name: 'تماس با ما', href: '#'},
  {id:2, name: 'درباره فروشگاه',  href: '#'},
  {id:3, name: 'قوانین خرید', href: '#' }]

  
export default function BurgerMenu() {
  const [isVisible, setVisible] = useState(false)

  const visibleHandler = () => {
    setVisible(true)
  }


  return (
    <div className="sm:hidden">
    {!isVisible? <GiHamburgerMenu onClick={visibleHandler} className="size-8 mr-2 mt-1"/>:null}
    {isVisible ?< MdOutlineClose onClick={visibleHandler} className="size-8 mr-2 mt-1"/>:null}
    <div className="bg-gray-100 max-w-20 max-h-36">
      <ul>
        {itemMenu.map((item)=>
        <li key={item.id}><a href={item.href}>{item.name}</a></li>
        )}
      </ul> 
    </div>
    </div>

  )
}
