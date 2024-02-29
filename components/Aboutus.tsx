import React from "react";

const Aboutus = () => {
  return (
    <div className="w-[80%] h-96 mx-auto flex justify-center my-20" dir="rtl">
      <div className=" w-[80%] pt-6">
        <h1 className=" font-bold text-2xl">چرا ما؟</h1>
        <div className=" pt-8 grid grid-cols-3">
          <div className="w-[70%] h-28  rounded-sm ">
            <h1 className=" text-lg font-bold p-2">نرخ های استثنایی</h1>{" "}
            <p className="px-4">
              نرخ رقابتی با تمام رقبا در تمام خدمات اعم از گیفت کارت ها، پرداخت
              ارزی و ...
            </p>
          </div>
          <div className="w-[70%] h-28  rounded-sm ">
            <h1 className=" text-lg font-bold p-2">پشتیبانی 24 ساعته</h1> <p className="px-4"> پشتیبانی 24 ساعته و یک تیم حرفه ای که اماده پاسخگویی به سوالات و مشکلات شما هستند</p>
          </div>
          <div className="w-[70%] h-28  rounded-sm ">
            <h1 className=" text-lg font-bold p-2"> فرایند آسان</h1> <p className="px-4">فقط با 3 کلیک میتونید محصول خود را انتخاب و فرایند خرید را تکمیل کنید و خریدی اسان را تجربه کنید</p>
          </div>
        </div>
      </div>
      <div className="w-[30%] h-[70%] rounded-l-[150px]  bg-gradient-to-r from-[#C8338C] to-[#0A95E5] "></div>
    </div>
  );
};

export default Aboutus;
