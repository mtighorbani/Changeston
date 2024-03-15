"use client";

import {
  GetOtpCodeCommand,
  GetOtpCodeResponse,
  PurchasePostData,
} from "@/models/models";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { customNotification } from "./CustomNotification";
import { currencyAmount, wiseDataPost } from "@/global/urls";
import axios from "axios";
import { Button, notification } from "antd";
import { useTokenContext } from "@/context/TokenContext";
import { useModalContext } from "@/context/ModalContext";

const CryptoPurchaseForm = (props: PurchasePostData) => {
  const [api, contextHolder] = notification.useNotification();
  const [currencyAmountResponse, setCurrencyAmountResponse] = useState<any>(null);

  const tokenContext = useTokenContext();
  const modalContext = useModalContext();

  
  const currencyAmountFn = async () => {
    try {
      const response = await axios.get(currencyAmount);
      setCurrencyAmountResponse(response.data);
    } catch (error) {
      console.error("Error fetching currency amount:", error);
    }
  }
  
  useEffect(() => {
    currencyAmountFn();
      
  }, []);


  const { mutate: mutatePurchasePostData, isPending: pendingPurchasePostData } =
    useMutation({
      mutationFn: async (data: PurchasePostData) =>
        (
          await axios.post(wiseDataPost, data, {
            headers: {
              Authorization: `Bearer ${tokenContext?.token}`,
            },
          })
        ).data,
      onSuccess: (res: any) => {
        if (res.success) {
          customNotification({
            api: api,
            type: "success",
            message: "درحال اتصال به درگاه",
          });
        } else {
          customNotification({
            api: api,
            type: "error",
            message: "متاسفانه پرداخت با خطا مواجه شد! لطفا مجددا تلاش کنید",
          });
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401) {
          modalContext?.setIsLoginModalOpen(true);
        } else {
          customNotification({
            api: api,
            type: "error",
            message: "متاسفانه پرداخت با خطا مواجه شد! لطفا مجددا تلاش کنید",
          });
        }
      },
    });

  const LogInErrHandler = () => {
    mutatePurchasePostData({
      amount: props.amount,
      currency_type: props.currency_type,
      group_id: props.group_id,
      iban: props.iban,
      payment_method: props.payment_method,
      receiver_email: props.receiver_email,
      receiver_name: props.receiver_name,
    });
  };

  return (
    <>
      {contextHolder}
      <div
        dir="rtl"
        className=" justify-center flex h-[60%] mt-20 w-full mb-30"
      >
        <div className="w-[35%] max-sm:w-full max-sm:pb-8 rounded-xl  min-h-[300px] dark:bg-black bg-[#EEEEEE] mt-4 h-[420px]  ">
          <div className="bg-[#F9FAFB] dark:bg-[#374151] w-full h-32 mt-8 rounded-xl ">
            <div className="felx block  ">
              <p className="font-bold text-lg pt-4 mr-6">
                نوع ارز : {props.currency_type}
              </p>
              <p className="font-bold text-lg pt-2 mr-6">
                نام: {props.receiver_name}
              </p>
              <p className="font-bold text-lg pt-2 mr-6">
                مقدار ارز : {props.amount}{" "}
              </p>
            </div>
          </div>
          <div className="bg-[#F9FAFB] dark:bg-[#374151] w-full min-h-14 mt-5 rounded-xl">
            <p className="text-cente pt-4 pr-4 font-bold text-md">
              {" "}
              آدرس ایمیل : {props.receiver_email}
            </p>
            <p
              dir="rtl"
              className="text-cente pt-4 pb-4 pr-4 font-bold text-md"
            >
              شناسه: {props.iban}
            </p>
          </div>
          <div>
            <div className="flex items-center mt-4">
              <input
                id="RulConfirm"
                type="radio"
                name="ruls"
                value="confirm"
                className="w-4 h-4 border-gray-300 mr-3 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                checked
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
            onClick={LogInErrHandler}
            loading={pendingPurchasePostData}
            className="w-[30%]  h-10 text-center pt-2  text-white pr-3 mt-10 mr-6  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
          >
            تایید و پرداخت
          </Button>
        </div>
      </div>
    </>
  );
};

export default CryptoPurchaseForm;
