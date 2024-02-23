import Image, { StaticImageData } from "next/image";
import React from "react";



interface FormProps {
  imgUrl: StaticImageData
  price: string
  FaName:string
  purchesId:number
}

const ConfirmForm = ({imgUrl,price,FaName, purchesId }:FormProps) => {
  const LogInErrHandler = ()=>{
    alert('با عرض پوزش در حال حاضر امکان خرید و ساخت اکانت وجود ندارد')
  }


  return (
    <div dir="rtl" className="flex max-sm:grid max-sm:grid-cols-1 justify-between h-[60%] mt-20 w-full mb-30">
      <div className="w-[35%] text-black max-sm:w-full max-sm:mr-0 rounded-xl grid grid-cols-1 min-h-[400px] dark:bg-black   bg-[#EEEEEE] mt-4 max-h=[700px] mr-[14%]">
        <form className="max-w-sm mr-3 mt-4 ">
          <label
            typeof="email" 
            className="block  dark:text-white  rtl:mr-0 mt-2 h-[10%] text-sm font-bold mb-1 text-gray-900 "
            
          >
            <p dir="rtl" className="text-right  ">
              {" "}
              نام و نام خانوادگی
            </p>
          </label>
          <input
            type="name"
            id="name"
            className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            required
            minLength={11}
          />
          <label
          
            typeof="number"
            className="block dark:text-white  rtl:mr-0 mt-2 h-[10%] text-sm  font-bold mb-1 text-gray-900 "
          >
            <p dir="rtl" className="text-right ">
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
            className="block  dark:text-white rtl:mr-0 mt-2 h-[10%] text-sm  font-bold mb-1 text-gray-900"
          >
            <p dir="rtl" className="text-right ">
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
        <div className="w-full h-12 max-sm:h-16 mt-5 text-white pr-3 pt-[9px] rounded-lg font-bold  bg-gradient-to-r from-[#C8338C] to-[#0A95E5] btn-primary">
          
          در هنگام ورود شماره همراه و ایمیل دقت کنید، اطلاعات خرید به آنها ارسال
          می شود.
        </div>
      </div>
      <div key={purchesId}  className="w-[35%] rounded-xl max-sm:w-full max-sm:pb-6  min-h-[300px] dark:bg-black bg-[#EEEEEE] mt-4 max-h=[700px] ml-[14%] ">
        <div  className="bg-[#F9FAFB] dark:bg-[#374151] w-full h-32 mt-8 rounded-xl ">

          <div key={purchesId} className="flex justify-between">
            <Image src={imgUrl} alt={FaName} className="h-[80%] max-sm:pt-7 pr-4 w-[30%] rounded-sm pt-3 relative"/>
            <p className="font-extrabold text-xl m-auto max-sm:pt-7">{FaName}</p>

          </div>

        </div>
        <div className="bg-[#F9FAFB] dark:bg-[#374151] w-full h-14 mt-5 rounded-xl">
          <p  className="text-cente pt-3 pr-4 font-extrabold text-xl">جمع مبلغ : {price}</p>
        </div>
        <div>
          <div className="flex items-center mt-4">
            
            <input
              id="RulConfirm"
              type="radio"
              name="ruls"
              value="confirm"
              className="w-4 h-4 mr-3 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              checked
            />
            <label
              typeof="country-option-1"
              className="block ms-2   text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              قوانین و ضوابط سایت را مطالعه کرده و می پذیرم. مشاهده قوانین و ضوابط
            </label>
          </div>
        </div>
        <div onClick={LogInErrHandler} className="w-[30%]  text-center cursor-not-allowed h-10 text-white pr-3 pt-[7px] mt-10 mr-6  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  ">
          تایید و پرداخت
        </div>
      </div>
    </div>
  )}


export default ConfirmForm;
