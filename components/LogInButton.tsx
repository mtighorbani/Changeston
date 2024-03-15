"use client";
import { useModalContext } from "@/context/ModalContext";
import { useUserContext } from "@/context/UserContext";
import { Button, notification } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosLogIn } from "react-icons/io";
import { customNotification } from "./CustomNotification";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { logoutUrl } from "@/global/urls";
import { useTokenContext } from "@/context/TokenContext";

const LogInButton = () => {
  const modalContext = useModalContext();
  const tokenContext = useTokenContext();
  // ** Notification
  const [api, contextHolder] = notification.useNotification();

  const { mutate: mutateLogOut, isPending: pendingLogOut } = useMutation({
    mutationFn: async () =>
      (
        await axios.post(
          logoutUrl,
          { refresh: tokenContext?.refreshToken },
          { headers: { Authorization: `Bearer ${tokenContext?.token}` } }
        )
      ).data,
    onSuccess: () => {
      customNotification({
        api: api,
        type: "success",
        message: "با موفقیت خارج شدید",
      });
      tokenContext?.setToken(undefined);
      tokenContext?.setRefreshToken(undefined);
    },
    onError: () => {
      customNotification({
        api: api,
        type: "error",
        message: "متاسفانه خروج با خطا مواجه شد! لطفا مجددا تلاش کنید",
      });
    },
  });

  const OpenLoginHandler = () => {
    modalContext?.setIsLoginModalOpen(true);
  };

  const LogOutHandler = () => {
    mutateLogOut();
  };
  return (
    <>
      {contextHolder}
      <div>
        {tokenContext?.token ? (
          <Button
            onClick={LogOutHandler}
            loading={pendingLogOut}
            className="max-sm:hidden  transition duration-300  sm:font-size-[6px] ease-in-out flex hover:outline bg-[#2089DA]   text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold max-sm:py-2 max-sm:px-3 py-2 px-4 rounded-md font-[BMitra] font-bold "
          >
            خروج
          </Button>
        ) : (
          <button
            onClick={OpenLoginHandler}
            className="max-sm:hidden  transition duration-300  sm:font-size-[6px] ease-in-out flex hover:outline bg-[#2089DA]   text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold max-sm:py-2 max-sm:px-3 py-2 px-4 rounded-md font-[BMitra] font-bold "
          >
            ورود / ثبت نام
            <IoIosLogIn className="max-sm:hidden size-6  ml-2" />
          </button>
        )}
      </div>
    </>
  );
};

export default LogInButton;
