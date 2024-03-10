"use client";

import { Button, Form, Input } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const LoginForm = () => {
  // ** Handlers
  const onSubmitHandler = (data: any) => {
    console.log(data);
  };

  /* // ** RegExp
  const phoneRegExp = /^(?:(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|9[0-4]|98)\d{7}|)$/ */

  return (
    <Form
      dir="ltr"
      {...layout}
      name="login-data"
      onFinish={onSubmitHandler}
      style={{ maxWidth: 600, minWidth: 500 }}
      // validateMessages={validateMessages}
      className=" max-sm:max-w-28"
    >
      <Form.Item
        name="phone"
        label={<span className="dark:text-white">شماره موبایل</span>}
        rules={[
          {
            required: true,
            message: "شماره تماس ضروری و می بایست 10 رقم باشد",
            min: 10,
            // pattern: phoneRegExp
          },
        ]}
      >
        <Input
          addonBefore={<span className="dark:text-white">+98</span>}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          className="w-[100%]  h-10 text-center  text-white pr-3  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
          htmlType="submit"
        >
          ورود
        </Button>
      </Form.Item>
      {/* <Button
        type="text"
        className="w-[100%]   text-center text-white pr-3  rounded-lg font-bold  "
      >
        ثبت نام
      </Button> */}
    </Form>
  );
};

export default LoginForm;
