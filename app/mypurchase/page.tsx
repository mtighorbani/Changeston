import axios from "axios";
import React from "react";

const userPurchase = {
  user: {
    id: 1,
    full_name: null,
  },
  user_products: [
    {
      id: 7,
      purchase: 8,
      completed: true,
      description: null,
      gift_code: "folanofolan", // in age null bood yani hanooz tavasot admin set nashode va be user bayad goft dar hal takmil...
      app_name: "googleplay",
      group_FaName: "گیفت کارد",
      payment_method: "zibal",
      date_time: "1402-12-21 21:32:23",
      value: "313930.0",
      tax: "1569.65",
      product_value: 5,
      product_currncytype: "usd",
    },
    {
      id: 8,
      purchase: 17,
      completed: true, // age sefaresh tavasot admin kamel shode bud in true mishe vagarna false
      description: "sefaresh shom ba movafaghiat takmil shod azizam.",
      group_FaName: "شارژ پنل وایز",
      payment_method: "novino",
      date_time: "1402-12-21 22:28:23",
      value: "46366",
      tax: "1333.0",
      product_value: 10,
      product_currncytype: "euro",
    },
  ],
  success: true,
};

const myPurches = () => {
  return (
    <div dir="rtl" className="  mx-48 min-h-[450px] m-8 ">
      <h1 className=" text-2xl font-bold  mb-8">خرید های من :</h1>
      <div>
        {userPurchase.user_products.map((x) => (
          <>
            <div className=" rounded-md ring-1  ring-gray-400    h-20 my-6">
              <div className=" flex w-full gap-4">
                <div className="  py-6 flex justify-start w-10  mr-8 ">
                  photo
                </div>
                <div className=" block mr-8 mt-2">
                  <p className=" text-xl pb-1 font-bold">{x.group_FaName}</p>
                  <p className=" text-lg font-semibold text-gray-400">
                    {x.value}
                  </p>
                </div>
                <div className=""> hi</div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default myPurches;
