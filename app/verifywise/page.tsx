"use client";
import purchaseStep from "@/Array/purchaseStep";
import CryptoPurchaseForm from "@/components/CryptoPurchaseForm";
import PurchaseStepBox from "@/components/PurchaseStepBox";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyWise = () => {
  // ** Search Params
  const searchParams = useSearchParams();
  const receiver_name = searchParams.get("receiver_name");
  const currency_type = searchParams.get("currency_type");
  const amount = searchParams.get("amount");
  const receiver_email = searchParams.get("receiver_email");
  const iban = searchParams.get("iban");
  // const group_id = searchParams.get('group_id')
  // const payment_method = searchParams.get('payment_method')

  // ** Router
  const router = useRouter();

  return (
    <div>
      <div className="w-[40%]  max-sm:w-[100%] max-sm:h-[15%] sm:ml-[30%] mt-[-80px] grid   grid-cols-3 m-auto place-content-center  gap-3 absolute  ring-2 ring-[#5a8dee] rounded-2xl bg-white  ">
        {purchaseStep.map((step) => (
          <PurchaseStepBox
            key={step.id}
            id={3}
            step={step}
            productVisibleHandler={() => router.replace('/')}
          />
        ))}
      </div>
      <div >
        <CryptoPurchaseForm
          amount={amount}
          currency_type={currency_type || ""}
          group_id="4"
          iban={iban || ""}
          payment_method="zibal"
          receiver_email={receiver_email || ""}
          receiver_name={receiver_name || ""}
        />
      </div>
    </div>
  );
};

export default VerifyWise;
