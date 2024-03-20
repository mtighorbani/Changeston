"use client";
import CryptoPurchaseForm from "@/components/CryptoPurchesForm";
import ProductsCard from "@/components/GroupingCard";
import { useParams } from "next/navigation";

const PayV2 = () => {
  const params = useParams<{
    receiver_name: string;
    currency_type: string;
    amount: string;
    receiver_email: string;
    iban: string;
  }>();
  return (
    <CryptoPurchaseForm
      amount={parseInt(params.amount)}
      currency_type={params.currency_type}
      group_id="4"
      iban={params.iban}
      payment_method="zibal"
      receiver_email={params.receiver_email}
      receiver_name={params.receiver_name}
    />
  );
};

export default PayV2;
