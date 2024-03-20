"use client";
import { useTokenContext } from "@/context/TokenContext";
import { paymentValidate } from "@/global/urls";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentVerify = () => {
  const [paymetStatus,setPaymentStatus] = useState('')

  const searchParams = useSearchParams();
  // شماره فاکتور
  const params = useParams<{ factorNumber: string }>();

  const Authority = searchParams.get("Authority");
  // شناسه فاکتور
  const TrackId:any = searchParams.get(`trackId`);


const paymentValidationCheck = async () => {
  try {
    const response = await axios.get(`${paymentValidate}${TrackId}`);
    setPaymentStatus(response.data);
  } catch (error) {
    console.error("Error fetching currency amount:", error);
  }
};
useEffect(()=>{
  paymentValidationCheck()
},[])

  return (
    // TODO: شناسه پرداخت و سایر یفلد ها باید داخل متن استفاده بشن
    <div>
      {
        paymetStatus
      }
    </div>
  );
};

export default PaymentVerify;
