import {
  GetOtpCodeCommand,
  GetOtpCodeResponse,
  PurchasePostData,
} from "@/models/models";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { customNotification } from "./CustomNotification";
import { wiseDataPost } from "@/global/urls";
import axios from "axios";
import { notification } from "antd";
import { headers } from "next/headers";

const CryptoPurchaseForm = ({
  amount,
  currency_type,
  receiver_name,
  receiver_email,
  iban,
  group_id,
  payment_method,
}: PurchasePostData) => {
  const [api, contextHolder] = notification.useNotification();

  const LogInErrHandler = () => {
    const { mutate: mutateGetOtpCode, isPending: pendingGetOtpCode } =
      useMutation({
        mutationFn: async (data: PurchasePostData) =>
          (
            await axios.post(wiseDataPost, data, {
              headers: {
                Authorization:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNTAwMDIyLCJpYXQiOjE3MTA0OTg4MDcsImp0aSI6IjNjNzcwYzJlOTZkNTRmMGNiY2UxMDIwMTYyOTNjYWFiIiwidXNlcl9pZCI6MTJ9.NTzPEX28KbRO_Ub8hfWv0a_xjTmdiDw0Otk7LyDV-Uk",
              },
            
            },)
          ).data,
        onSuccess: (res: GetOtpCodeResponse) => {
          if (res.success) {
            customNotification({
              api: api,
              type: "success",
              message: "درحال اتصال به درگاه",
            });
            setFirstLoginStep(false);
          } else {
            if (res.error?.code === 4) {
              customNotification({
                api: api,
                type: "error",
                message:
                  "رمز عبور برای شما ارسال شده است، برای ارسال مجدد لطفا صبر کنید",
              });
              setCounter(res.error.wait_for || 0);
            } else {
              customNotification({
                api: api,
                type: "error",
                message:
                  "متاسفانه ارسال رمز عبور موقت با خطا مواجه شد! لطفا مجددا تلاش کنید",
              });
            }
          }
        },
        onError: () => {
          customNotification({
            api: api,
            type: "error",
            message:
              "متاسفانه ارسال رمز عبور موقت با خطا مواجه شد! لطفا مجددا تلاش کنید",
          });
        },
      });
  };

  return (
    <div dir="rtl" className=" justify-center flex h-[60%] mt-20 w-full mb-30">
      <div className="w-[35%] max-sm:w-full max-sm:pb-8 rounded-xl  min-h-[300px] dark:bg-black bg-[#EEEEEE] mt-4 h-[420px]  ">
        <div className="bg-[#F9FAFB] dark:bg-[#374151] w-full h-32 mt-8 rounded-xl ">
          <div className="felx block  ">
            <p className="font-bold text-lg pt-4 mr-6">
              نوع ارز : {currency_type}
            </p>
            <p className="font-bold text-lg pt-2 mr-6">نام: {receiver_name}</p>
            <p className="font-bold text-lg pt-2 mr-6">مقدار ارز : {amount} </p>
          </div>
        </div>
        <div className="bg-[#F9FAFB] dark:bg-[#374151] w-full min-h-14 mt-5 rounded-xl">
          <p className="text-cente pt-4 pr-4 font-bold text-md">
            {" "}
            آدرس ایمیل : {receiver_email}
          </p>
          <p dir="rtl" className="text-cente pt-4 pb-4 pr-4 font-bold text-md">
            شناسه: {iban}
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
        <div
          onClick={LogInErrHandler}
          className="w-[30%]  h-10 text-center pt-2 cursor-not-allowed text-white pr-3 mt-10 mr-6  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
        >
          تایید و پرداخت
        </div>
      </div>
    </div>
  );
};

export default CryptoPurchaseForm;
function setFirstLoginStep(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCounter(arg0: any) {
  throw new Error("Function not implemented.");
}
