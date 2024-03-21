"use client";
import { errorMessage } from "@/global/errorMessage";
import { paymentValidate } from "@/global/urls";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentVerify = () => {
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);
  // شماره فاکتور
  const params = useParams<{ factorNumber: string }>();

  const searchParams = useSearchParams();
  const Success = searchParams.get("success");
  const Status = searchParams.get("status");
  const TrackId = searchParams.get("trackId");

  const paymentValidationCheck = async () => {
    try {
      const response = await axios.get(`${paymentValidate}${TrackId}`);
      setPaymentStatus(response.data.success);
      console.log(errorMessage(response.data.error));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    paymentValidationCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return paymentStatus ? (
    <div>
      Success!!! success: {Success}, status: {Status}, trackId: {TrackId},
      factorNumber: {params.factorNumber}
    </div>
  ) : (
    <div>
      Failed!!! success: {Success}, status: {Status}, trackId: {TrackId},
      factorNumber: {params.factorNumber}
    </div>
  );
};

export default PaymentVerify;
