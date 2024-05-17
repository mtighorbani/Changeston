"use client";

import React, { useContext, useEffect } from "react";
import LogInButton from "./LogInButton";
import ThemeSwitch from "./Theme";
import BurgerMenu from "./BurgerMenu";
import Image from "next/image";
import Logo from "../asset/images/changeston-high-resolution-logo-transparent.png";
import { Modal, notification } from "antd";
import LoginForm from "./LoginForm";
import { useModalContext } from "@/context/ModalContext";
import {
  RefreshAccessTokenModel,
  RefreshAccessTokenResponse,
} from "@/models/models";
import { customNotification } from "@/global/customNotification";
import { errorMessage } from "@/global/errorMessage";
import { useMutation } from "@tanstack/react-query";
import { refreshAccessTokenUrl } from "@/global/urls";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const modalContext = useModalContext();
  const [api, contextHolder] = notification.useNotification();
  const auth = useContext(AuthContext);

  // TODO: Make this global hook
  const { mutate: mutateRefreshAccessToken } = useMutation({
    mutationFn: async (data: RefreshAccessTokenModel) =>
      (await axios.post(refreshAccessTokenUrl, data)).data,
    onSuccess: async (res: RefreshAccessTokenResponse) => {
      if(res.success){
        if (auth?.isAuthenticated) {
          auth?.login({ ...auth.user, accessToken: res.access });
        }
      }else {
        auth?.logout()
      }
    },
    onError: (err: RefreshAccessTokenResponse) => {
      auth?.logout()
      customNotification({
        api: api,
        type: "error",
        message: errorMessage(err.error),
      });
    },
  });

  useEffect(() => {
    if (auth?.isAuthenticated) {
      const interval = setInterval(() => {
        mutateRefreshAccessToken({ refresh: auth?.user?.refreshToken });
      }, 1 * 60 * 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isAuthenticated]);

  return (
    <>
      {contextHolder}
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
          <span className="px-4 max-sm:hidden pt-3 ">
            <a href="/mypurchase">خرید های من</a>
          </span>
        </div>
      </div>
      {/* <div className="w-5/6 h-1 bg-gray-500 m-auto"/> */}
    </>
  );
};

export default Navbar;
