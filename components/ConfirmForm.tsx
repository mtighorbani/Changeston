"use client";

import { AuthContext } from "@/context/AuthContext";
import { useModalContext } from "@/context/ModalContext";
import { customNotification } from "@/global/customNotification";
import { errorMessage } from "@/global/errorMessage";
import { paymentLinkUrl } from "@/global/urls";
import { GetPaymentLinkCommand, PaymentLinkResponse } from "@/models/models";
import { LoadingOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, notification } from "antd";
import axios from "axios";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

interface Props {
  id: number | undefined;
  amount: number | undefined;
  name: string | undefined;
  imgUrl?: StaticImageData;
  currencyType?: string;
  paymentLinkCommand: GetPaymentLinkCommand;
}

const ConfirmForm = ({
  imgUrl,
  amount: amount,
  name: name,
  id: id,
  currencyType,

  paymentLinkCommand,
}: Props) => {
  /* const LogInErrHandler = () => {
    alert("با عرض پوزش در حال حاضر امکان خرید و ساخت اکانت وجود ندارد");
  }; */
  const [api, contextHolder] = notification.useNotification();
  const modalContext = useModalContext();
  const auth = useContext(AuthContext);

  // Router
  const router = useRouter();

  // ** Handlers
  const ConfirmHandler = () => {
    if (!auth?.isAuthenticated) {
      modalContext?.setIsLoginModalOpen(true);
    } else {
      mutateGetPaymentLink(paymentLinkCommand);
    }
  };

  const { mutate: mutateGetPaymentLink, isPending: pendingPurchasePostData } =
    useMutation({
      mutationFn: async (data: GetPaymentLinkCommand) =>
        (
          await axios.post(paymentLinkUrl, data, {
            headers: {
              Authorization: `Bearer ${auth?.user?.accessToken}`,
            },
          })
        ).data,
      onSuccess: (res: PaymentLinkResponse) => {
        if (res.success) {
          customNotification({
            api: api,
            type: "success",
            message: "درحال انتقال به درگاه پرداخت",
            icon: <LoadingOutlined />,
          });
          router.push(res?.gateway);
        } else {
          customNotification({
            api: api,
            type: "error",
            message: errorMessage(res.error),
          });
        }
      },
      onError: (err: any) => {
        customNotification({
          api: api,
          type: "error",
          message: errorMessage(undefined),
        });
      },
    });

  return (
    <>
      {contextHolder}
      <div
        dir="rtl"
        className="flex max-sm:grid max-sm:grid-cols-1 justify-between h-[60%] mt-20 w-full mb-30"
      >
        {/* //TODO: Fix this UI & remove this <div></div>
         */}
        <div className="w-[35%] text-black max-sm:w-full max-sm:mr-0 rounded-xl grid grid-cols-1 min-h-[400px] dark:bg-black   bg-[#EEEEEE] mt-4 max-h=[700px] mr-[14%]">
          <form className="max-w-sm mr-3 mt-4 ">
            <label
              typeof="email"
              className="block  dark:text-white  rtl:mr-0 mt-2 h-[10%] text-sm font-bold mb-1 text-gray-900 "
            >
              <p dir="rtl" className="text-right  ">
                {" "}
                نام و نام خانوادگی
              </p>
            </label>
            <input
              type="name"
              id="name"
              className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder=""
              required
              minLength={11}
            />
            <label
              typeof="number"
              className="block dark:text-white  rtl:mr-0 mt-2 h-[10%] text-sm  font-bold mb-1 text-gray-900 "
            >
              <p dir="rtl" className="text-right ">
                {" "}
                شماره تماس
              </p>
            </label>
            <input
              type="phone"
              id="phone"
              dir="ltr"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="0912-***-5589"
              required
            />
            <label
              typeof="email"
              className="block  dark:text-white rtl:mr-0 mt-2 h-[10%] text-sm  font-bold mb-1 text-gray-900"
            >
              <p dir="rtl" className="text-right ">
                {" "}
                آدرس ایمیل
              </p>
            </label>
            <input
              type="email"
              id="email"
              dir="ltr"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="changeton@gmail.com"
              required
            />
          </form>
          <div className="w-full h-12 max-sm:h-16 mt-5 text-white pr-3 pt-[9px] rounded-lg font-bold  bg-gradient-to-r from-[#C8338C] to-[#0A95E5] btn-primary">
            در هنگام ورود شماره همراه و ایمیل دقت کنید، اطلاعات خرید به آنها
            ارسال می شود.
          </div>
        </div>
        <div
          key={id}
          className="w-[35%] rounded-xl max-sm:w-full max-sm:pb-6  min-h-[300px] dark:bg-black bg-[#EEEEEE] mt-4 max-h=[700px] ml-[14%] "
        >
          <div className="bg-[#F9FAFB] dark:bg-[#374151] w-full h-32 mt-8 rounded-xl ">
            {
              // TODO : remove this condition when images added
              <div key={id} className="flex justify-between">
                <Image
                  src={imgUrl || "/images/empty.jpg"}
                  width={300}
                  height={200}
                  alt={name || ""}
                  className="h-[80%] max-sm:pt-7 pr-4 w-[30%] rounded-sm pt-3 relative"
                />
                <p className="font-extrabold text-xl m-auto max-sm:pt-7">
                  {name}
                </p>
              </div>
            }
          </div>
          <div className="bg-[#F9FAFB] dark:bg-[#374151] w-full h-14 mt-5 rounded-xl">
            <p className="text-cente pt-3 pr-4 font-extrabold text-xl">
              جمع مبلغ : {amount}
              {currencyType
                ? currencyType === "usd"
                  ? "$"
                  : currencyType === "euro" && "€"
                : "تومان"}
            </p>
          </div>
          <div>
            <div className="flex items-center mt-4">
              <input
                id="RulConfirm"
                type="radio"
                name="ruls"
                value="confirm"
                className="w-4 h-4 mr-3 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                checked
                readOnly
              />
              <label
                typeof="country-option-1"
                className="block ms-2   text-sm font-medium text-gray-900 dark:text-gray-300 "
              >
                قوانین و ضوابط سایت را مطالعه کرده و می پذیرم. مشاهده قوانین و
                ضوابط
              </label>
            </div>
          </div>
          <Button
            onClick={ConfirmHandler}
            className="w-[30%]  text-center h-10 text-white pr-3 pt-[7px] mt-10 mr-6  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
          >
            تایید و پرداخت
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConfirmForm;
