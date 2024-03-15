"use client";

import LoginForm from "@/components/LoginForm";
import { Modal } from "antd";
import { IoIosLogIn } from "react-icons/io";

const Login = () => {
  
  return (
    <Modal footer={false} title={"ورود / ثبت نام"} open={true}>
    </Modal>
    /*     <div className="mb-48">
      <h1
        dir="rtl"
        className=" mx-auto justify-center flex text-2xl mb-24 mt-4"
      >
        <IoIosLogIn className="max-sm:hidden size-6  ml-2 mt-2" />
        <span>ورود / ثبت نام</span>
      </h1>
      <div
        className=" mx-auto justify-center flex text-2xl mb-24 mt-4"
        dir="rtl"
      >
        <div className="max-sm:ml-0 max-sm:mb-16 ">{<LoginForm />}</div>
      </div>
    </div> */
  );
};

export default Login;
