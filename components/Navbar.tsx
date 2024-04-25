"use client";

import React from "react";
import LogInButton from "./LogInButton";
import ThemeSwitch from "./Theme";
import BurgerMenu from "./BurgerMenu";
import Image from "next/image";
import Logo from "../asset/images/changeston-high-resolution-logo-transparent.png";
import { Modal } from "antd";
import LoginForm from "./LoginForm";
import { useModalContext } from "@/context/ModalContext";

const Navbar = () => {
  const modalContext = useModalContext();

  return (
    <>
      <Modal
        footer={false}
        open={modalContext?.isLoginModalOpen}
        onCancel={() => modalContext?.setIsLoginModalOpen(false)}

      >
        <LoginForm />
      </Modal>
      <div className="  flex justify-between max-sm:px-3 max-sm:py-2 max-sm:mt-3  sm:px-28 py-5 sm:mx-24 md:mx-2 lg:mx-16 max-h-[100px] ">
        <div className="flex max-w-1/3">
          <BurgerMenu />
          <LogInButton />
          <ThemeSwitch />
        </div>
        <div
          dir="rtl"
          className="flex justify-between  font-bold max-sm:font-normal "
        >
          <a href="/">
            <Image
              src={Logo}
              alt="logo"
              className="px-4 w-36 cursor-pointer pt-[-5px]"
            ></Image>
          </a>
          <span className="px-4 max-sm:hidden pt-3 ">
            <a href="/contactus">تماس با ما</a>
          </span>
          <span className="px-4 max-sm:hidden pt-3 ">
            <a href="/aboutus">درباره ما</a>
          </span>
          <span className="px-4 max-sm:hidden pt-3 ">
            <a href="/rules">قوانین خرید</a>
          </span>
        </div>
      </div>
      {/* <div className="w-5/6 h-1 bg-gray-500 m-auto"/> */}
    </>
  );
};

export default Navbar;
