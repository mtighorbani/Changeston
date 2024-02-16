import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

const BlurText = () => {
  const [visible, setVisible] = useState(true);

  const closeButtonHandler = () => {
    setVisible(false)
  };

  return (
    <>
      {visible ? (
        <div className=" max-sm:w-full bg-white bg-opacity-80  text-[#30508c]  max-sm:left-0 max-sm:bottom-5 max-sm:mt-20 max-sm:mb-0  max-sm:static rounded-2xl  w-[30%] h-[15%] pt-1 m-auto top-[20%] absolute left-[35%] p-5">
          <MdOutlineClose
            className="size-8 cursor-pointer"
            onClick={closeButtonHandler}
          />
          <p className="font text-center font-bold font-lg static">
           
            با پشتیبانی 24 ساعته ما از طریق لینک زیر در ارتباط باشید <br />
            <a href="/">Telegram</a>
          </p>
        </div>
      ) : null}
    </>
  );
};

export default BlurText;
