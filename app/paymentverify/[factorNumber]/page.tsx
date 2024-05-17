"use client";
import { paymentValidate } from "@/global/urls";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SuccessImg from "@/asset/images/success.png";
import FailedImg from "@/asset/images/Faile.png";
import Image from "next/image";
import { PaymentResult } from "@/models/models";

const PaymentVerify = () => {
  // شماره فاکتور
  const params = useParams<{ factorNumber: string }>();

  const searchParams = useSearchParams();

  const TrackId = searchParams.get("trackId");

  const {
    data: paymentValidateData,
    refetch: refetchPaymentValidate,
    isFetching: isFetchingPaymentValidate,
  } = useQuery<PaymentResult>({
    queryFn: async () => (await axios.get(`${paymentValidate}${TrackId}`)).data,
    queryKey: ["paymentValidateData"],
    });
 

  return isFetchingPaymentValidate ? (
    <div className=" m-auto mt-24 min-h-lvh justify-center max-w-[700px]   " > 
     <p className=" text-4xl text-bold"> ... درحال بررسی نتیجه پرداخت. لطفا شکیبا باشید</p>
    </div>
  ) : (
    <div className=" felx  max-w-[500px] mx-auto  min-h-lvh " dir="rtl">
      {paymentValidateData?.success == true ? (
        <div>
          <Image
            src={SuccessImg}
            className="mx-auto"
            height={500}
            alt="SuccessPayment"
          />
          <div className=" text-center">
            <h1 className="  text-3xl font-bold">
              پرداخت شما با موفقیت انجام شد
            </h1>
            <div className=" text-gray-400 mt-2 text-lg font-semibold">
              <p>جهت پیکیری سفارش خود با پشتیبانی در ارتباط باشید</p>
              <p>شماره پیگیری سفارش : {TrackId}</p>
              <p>شماره فاکتور : {params.factorNumber}</p>
            </div>
          </div>
        </div>
      ) : paymentValidateData?.success == false ? (
        <div>
          <Image
            src={FailedImg}
            className="mx-auto"
            height={500}
            alt="SuccessPayment"
          />
          <div className=" text-center mt-4">
            <h1 className="  text-3xl font-bold">
              پرداخت شما با خطا مواجه شده است
            </h1>
            <div className=" text-gray-400 mt-2 text-lg font-semibold">
              <p>
               در صورتی که از حساب شما مبلغی کسر شده است. ظرف 24 ساعت اینده به حساب شما باز خواهد گشت
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PaymentVerify;
