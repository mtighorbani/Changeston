"use client";
import { useModalContext } from "@/context/ModalContext";
import { Button, Modal, Spin, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { customNotification } from "../global/customNotification";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { logoutUrl } from "@/global/urls";
import { AuthContext } from "@/context/AuthContext";

interface Props {
  isSmHidden?: boolean;
}

const LogInButton = (props: Props) => {
  // ** Context
  const modalContext = useModalContext();
  const auth = useContext(AuthContext);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // ** Notification
  const [api, contextHolder] = notification.useNotification();

  // ** Hooks
  useEffect(() => {
    setMounted(true);
  }, []);

  // ** Handlers
  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // ** API calls
  const { mutate: mutateLogOut, isPending: pendingLogOut } = useMutation({
    mutationFn: async () =>
      (
        await axios.post(
          logoutUrl,
          { refresh: auth?.user?.refreshToken },
          {
            headers: {
              Authorization: `Bearer ${auth?.user?.accessToken}`,
            },
          }
        )
      ).data,
    onSuccess: (res) => {
      customNotification({
        api: api,
        type: "success",
        message: "با موفقیت خارج شدید",
      });
      auth?.logout();
      handleCloseLogoutModal();
    },
    onError: () => {
      customNotification({
        api: api,
        type: "success",
        message: "با موفقیت خارج شدید",
      });
      auth?.logout();
      handleCloseLogoutModal();
    },
  });

  const OpenLoginHandler = () => {
    modalContext?.setIsLoginModalOpen(true);
  };

  const LogOutHandler = () => {
    mutateLogOut();
  };

  if (!mounted) {
    return (
      <div>
        <button
          className={
            props.isSmHidden
              ? "sm:hidden cursor-not-allowed transition duration-300  sm:font-size-[6px] ease-in-out flex hover:outline bg-[#2089DA]   text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold max-sm:py-2 max-sm:px-3 py-2 px-4 rounded-md font-[BMitra] font-bold "
              : "max-sm:hidden cursor-not-allowed transition duration-300  sm:font-size-[6px] ease-in-out flex hover:outline bg-[#2089DA]   text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold max-sm:py-2 max-sm:px-3 py-2 px-4 rounded-md font-[BMitra] font-bold "
          }
        >
          ...
        </button>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <Modal
        style={{ direction: "rtl" }}
        open={isLogoutModalOpen}
        onCancel={handleCloseLogoutModal}
        title={"آیا می خواهید خارج شوید؟"}
        footer={[
          <Button
            key={"cancel"}
            onClick={handleCloseLogoutModal}
            className="rounded-md font-[BMitra] "
          >
            خیر
          </Button>,
          <Button
            key={"submit"}
            loading={pendingLogOut}
            onClick={LogOutHandler}
            className="transition hover:outline bg-[#2089DA]   text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold  rounded-md font-[BMitra] font-bold "
          >
            بله! خارج می شوم
          </Button>,
        ]}
      ></Modal>
      <div>
        {auth?.isAuthenticated ? (
          <center>
            <button
              onClick={handleOpenLogoutModal}
              className={
                props.isSmHidden
                  ? "sm:hidden p-2 text-center"
                  : "max-sm:hidden  transition duration-300  sm:font-size-[6px] ease-in-out flex hover:outline bg-[#2089DA]   text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold max-sm:py-2 max-sm:px-3 py-2 px-4 rounded-md font-[BMitra] font-bold "
              }
            >
              خروج
            </button>
          </center>
        ) : (
          <button
            onClick={OpenLoginHandler}
            className={
              props.isSmHidden
                ? "sm:hidden p-2 text-center"
                : "max-sm:hidden  transition duration-300  sm:font-size-[6px] ease-in-out flex hover:outline bg-[#2089DA]   text-white hover:outline-[#5a8dee] button hover:bg-white hover:text-[#5a8dee] hover:font-extrabold max-sm:py-2 max-sm:px-3 py-2 px-4 rounded-md font-[BMitra] font-bold "
            }
          >
            ورود / ثبت نام
            <IoIosLogIn className={"max-sm:hidden size-6  ml-2"} />
          </button>
        )}
      </div>
    </>
  );
};

export default LogInButton;
