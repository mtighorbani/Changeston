"use client";
import { useParams, useSearchParams } from "next/navigation";

const PaymentVerify = () => {
  const searchParams = useSearchParams();
  // شماره فاکتور
  const params = useParams<{ factorNumber: string }>();

  const Authority = searchParams.get("Authority");
  // شناسه فاکتور
  const InvoiceID = searchParams.get("InvoiceID");
  // وضعیت پرداخت
  const PaymentStatus = searchParams.get("PaymentStatus");

  return (
    // TODO: شناسه پرداخت و سایر یفلد ها باید داخل متن استفاده بشن
    <div>
      {PaymentStatus === "OK"
        ? "پرداخت با موفقیت انجام شد"
        : "پرداخت با خطا مواجه شد"}
    </div>
  );
};

export default PaymentVerify;
