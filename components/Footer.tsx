import Image from "next/image";
import React from "react";
import Imafe from "../asset/images/Enamadlogo.png";

const Footer = () => {
  return (
    <footer dir="rtl" className=" dark:bg-black flex max-sm:block mb-0 justify-between w-full h-[20%] py-10 bg-slate-100">

      <div dir="rtl" className="mr-[10%] my-auto block">
        {" "}
        <a className="block font-bold pb-2 text-lg" href="/">
          تماس با ما
        </a>
        <a className="block font-bold pb-2 text-lg" href="/">
          درباره ما
        </a>
        <a className="block font-bold pb-2 text-lg" href="/"> قوانین خرید</a>
      </div>
      <div dir="rtl" className="ml-[10%] max-sm:mt-4 max-sm:mr-4 my-auto">
        کلیه حقوق این سایت متعلق به چنجستون می باشد.
      </div>
    </footer>
  );
};

export default Footer;
