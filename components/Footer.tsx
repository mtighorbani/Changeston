import Image from "next/image";
import React from "react";
import Imafe from "../asset/images/Enamadlogo.png";

const Footer = () => {
  return (
    <footer dir="rtl" className=" dark:bg-black flex  mb-0 justify-between w-full h-[20%] py-10 bg-slate-100">
        <div dir="rtl" className="mr-[10%]  max-sm:mr-4 my-auto">

      <a referrerPolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=467241&Code=PUl45fNIVUi5QYQsxxnunJ0XD1sIpjqT'><Image referrerPolicy='origin' src={Imafe} alt='' className='curcursor-pointer w-28 h-28'width={0} height={0} /></a>  
      </div>

     <div dir="rtl" className="ml-[10%] max-sm:mt-12 max-sm:mr-4 my-auto">
        کلیه حقوق این سایت متعلق به چنجستون می باشد.
      </div>
    </footer>
  );
};

export default Footer;
