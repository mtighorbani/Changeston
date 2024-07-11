"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { Fragment, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import itemMenu from "@/Array/itemMenu";
import { Button } from "antd";
import LogInButton from "./LogInButton";

export default function BurgerMenu() {
  const [isVisible, setVisible] = useState(true);

  const visibleHandler = () => {
    {
      setVisible(false);
    }
  };
  const closeVisibleHandler = () => {
    {
      setVisible(true);
    }
  };

  return (
    <div className="sm:hidden ">
      {isVisible ? (
        <GiHamburgerMenu
          onClick={visibleHandler}
          className="cursor-pointer size-8 mr-2 mt-1"
        />
      ) : null}
      {!isVisible ? (
        <MdOutlineClose
          onClick={closeVisibleHandler}
          className="cursor-pointer size-8 mr-2 mt-1"
        />
      ) : null}
      {!isVisible ? (
        <div className=" max-w-20">
          <ul className=" absolute ml-2 mt-3 bg-white dark:bg-black m-2 px-4 ring-1 ring-black dark:ring-white: ">
            <LogInButton isSmHidden />
            <div className="h-[1px] w-full bg-black dark:bg-white" />
            {itemMenu.map((item) => (
              <Fragment key={item.id}>
                <li className=" p-2 text-center  ">
                  <a href={item.href}>{item.name}</a>
                </li>
                <div className="h-[1px] w-full bg-black dark:bg-white" />
              </Fragment>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
