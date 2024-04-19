"use client";
import CryptoPurchaseForm from "@/components/CryptoPurchesForm";
import { useSearchParams } from "next/navigation";

const PayV2 = () => {
  const searchParams = useSearchParams();
  const receiver_name = searchParams.get("receiver_name");
  const currency_type = searchParams.get("currency_type");
  const amount = searchParams.get("amount");
  const receiver_email = searchParams.get("receiver_email");
  const iban = searchParams.get("iban");

  return (
    <CryptoPurchaseForm
      amount={amount}
      currency_type={currency_type || ""}
      group_id="4"
      iban={iban || ""}
      payment_method="zibal"
      receiver_email={receiver_email || ""}
      receiver_name={receiver_name || ""}
    />
  );
};

export default PayV2;
