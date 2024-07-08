import React from "react";

const aboutUsItems = [
  {
    title: "نرخ های استثنایی",
    desc: "نرخ رقابتی با تمام رقبا در تمام خدمات اعم از گیفت کارت ها، پرداخت ارزی و ...",
  },
  {
    title: "پشتیبانی 24 ساعته",
    desc: "پشتیبانی 24 ساعته و یک تیم حرفه ای که اماده پاسخگویی به سوالات و مشکلات شما هستند",
  },
  {
    title: "فرایند آسان",
    desc: "فقط با 3 کلیک میتونید محصول خود را انتخاب و فرایند خرید را تکمیل کنید و خریدی اسان را تجربه کنید",
  },
];

const Aboutus = () => {
  return (
    <div
      className=" min-h-screen mx-auto bg-gray-200 dark:bg-slate-800 flex flex-col items-center py-16"
      dir="rtl"
    >
      <h1 className="font-bold text-5xl py-10 text-slate-800 dark:text-gray-100">
        چرا ما؟
      </h1>
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
        {aboutUsItems.map((x, index) => (
          <div key={index} className="max-w-md shadow-fuchsia-700 w-full bg-white dark:bg-slate-700 rounded-2xl shadow-md p-8 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-gray-100 mb-4">{x.title}</h2>
            <p className="text-lg font-medium text-slate-600 dark:text-gray-300">{x.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aboutus;
