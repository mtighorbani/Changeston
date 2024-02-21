import Image, { StaticImageData } from "next/image";
import React from "react";



interface FormProps {
  id : number
  imgUrl: StaticImageData
  price: string
  FaName:string
}

const ConfirmForm = ({id,imgUrl,price,FaName}:FormProps) => {

  return (
    <div dir="rtl" className="flex  justify-between h-[60%] mt-4  w-full mb-80">
      <div className="w-[35%] text-black  rounded-xl grid grid-cols-1 min-h-[400px] bg-[#EEEEEE] mt-4 max-h=[700px] mr-[14%]">
        <form className="max-w-sm mr-3 mt-4">
          <label
            typeof="email"
            className="block  rtl:mr-0 mt-2 h-[10%] text-sm font-medium text-gray-900 dark:text-white"
          >
            <p dir="rtl" className="text-right  dark:text-black">
              {" "}
              نام و نام خانوادگی
            </p>
          </label>
          <input
            type="name"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            required
          />
          <label
            typeof="email"
            className="block  rtl:mr-0 mt-2 h-[10%] text-sm font-medium text-gray-900 dark:text-white"
          >
            <p dir="rtl" className="text-right  dark:text-black">
              {" "}
              شماره تماس
            </p>
          </label>
          <input
            type="phone"
            id="phone"
            dir="ltr"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="0912-***-5589"
            required
          />
          <label
            typeof="email"
            className="block  rtl:mr-0 mt-2 h-[10%] text-sm font-medium text-gray-900 dark:text-white"
          >
            <p dir="rtl" className="text-right  dark:text-black">
              {" "}
              آدرس ایمیل
            </p>
          </label>
          <input
            type="email"
            id="email"
            dir="ltr"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="changeton@gmail.com"
            required
          />
        </form>
        <div className="w-full h-12 text-white pr-3 pt-[9px] rounded-lg font-bold   bg-[#3BA7F4] btn-primary">
          
          در هنگام ورود شماره همراه و ایمیل دقت کنید، اطلاعات خرید به آنها ارسال
          می شود.
        </div>
      </div>
      <div  className="w-[35%] rounded-xl  min-h-[300px] bg-[#EEEEEE] mt-4 max-h=[700px] ml-[14%] ">
        <div className="bg-[#F9FAFB] w-full h-28 mt-8 rounded-xl flex justify-between">

          <div key={id}>
            <Image src={imgUrl} alt={FaName} className="h-[80%] pr-4 w-[30%] rounded-sm  pt-6"/>
            <p>{FaName}</p>

          </div>

        </div>
        <div className="bg-[#F9FAFB] w-full h-14 mt-5 rounded-xl">
          {" "}
          <p key={id} className="text-cente pt-3 pr-4">جمع مبلغ : {price}</p>
        </div>
        <div>
          <div className="flex items-center mt-4">
            
            <input
              id="RulConfirm"
              type="radio"
              name="ruls"
              value="confirm"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              checked
            />
            <label
              typeof="country-option-1"
              className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              قوانین و ضوابط سایت را مطالعه کرده و می پذیرم. مشاهده قوانین و ضوابط
            </label>
          </div>
        </div>
        <div className="w-[20%] h-8 text-white pr-3 pt-[4px] mt-10 mr-6  rounded-lg font-bold bg-gradient-to-r from-green-400 to-blue-500 ">
          تایید و پرداخت
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;
